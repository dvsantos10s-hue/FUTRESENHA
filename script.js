const SUPABASE_URL = "https://qebsemnlhikhmucyjdut.supabase.co/rest/v1/";
const SUPABASE_KEY = "sb_publishable_1dB6oHhncjKZVO4utmaU3w_d_pxTQiz";

const db = window.supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);

function obterEleitorId() {
let id = localStorage.getItem("fut_resenha_eleitor_id");

if (!id) {
id = crypto.randomUUID();
localStorage.setItem("fut_resenha_eleitor_id", id);
}

return id;
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
return false;
}

return data !== null;
}

async function registrarVotos(nomes) {
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
