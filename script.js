const SUPABASE_URL = "https://qebsemnlhikhmucyjdut.supabase.co";
const SUPABASE_KEY = "SUA_CHAVE_PUBLICAVEL_AQUI";

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
.from("votos")
.select("id")
.eq("eleitor_id", eleitorId)
.limit(1);

if (error) {
console.error("Erro ao verificar votação:", error);
return false;
}

return data && data.length > 0;
}

async function registrarVotos(nomes) {
const eleitorId = obterEleitorId();

const votos = nomes.map(nome => ({
eleitor: "anonimo",
eleitor_id: eleitorId,
membro: nome
}));

const { error } = await db
.from("votos")
.insert(votos);

if (error) {
console.error("Erro ao registrar votos:", error);
alert("Erro do Supabase: " + error.message);
return false;
}

return true;
}
