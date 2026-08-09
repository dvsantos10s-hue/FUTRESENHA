
const const SUPABASE_URL = "https://qebsemnlhikhmucyjdut.supabase.co/rest/v1/";
const SUPABASE_KEY = "sb_publishable_1dB6oHhncjKZVO4utmaU3w_d_pxTQiz";

const db = window.supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);

function obterEleitorId() {
let eleitorId = localStorage.getItem("fut_resenha_eleitor_id");

if (!eleitorId) {
eleitorId = crypto.randomUUID();
localStorage.setItem("fut_resenha_eleitor_id", eleitorId);
}

return eleitorId;
}

async function verificarSeJaVotou() {
const eleitorId = obterEleitorId();

const { data, error } = await db
.from("eleitores_votaram")
.select("eleitor_id")
.eq("eleitor_id", eleitorId)
.maybeSingle();

if (error) {
console.error("Erro ao verificar votação:", error);
alert("Erro do Supabase: " + error.message);
return false;
}

return data !== null;
}

async function registrarVotos(nomes) {
if (!Array.isArray(nomes) || nomes.length !== 3) {
alert("Você precisa selecionar exatamente 3 membros.");
return false;
}

const eleitorId = obterEleitorId();

const { data, error } = await db.rpc(
"registrar_votacao",
{
p_eleitor_id: eleitorId,
p_membros: nomes
}
);

if (error) {
console.error("Erro ao registrar votos:", error);
alert("Erro do Supabase: " + error.message);
return false;
}

return data === true;
}
