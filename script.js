const SUPABASE_URL = "https://qebsemnlhikhmucyjdut.supabase.co/rest/v1/";
const SUPABASE_KEY = "sb_publishable_1dB6oHhncjKZVO4utmaU3w_d_pxTQiz";

const db = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

async function registrarVotos(nomes) {
  const votos = nomes.map(nome => ({
    eleitor: "anonimo",
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
