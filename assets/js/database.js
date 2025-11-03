import { supabaseApi } from "./auth.js"

export async function fetchDocData(table) {
  let { data, error } = await supabaseApi.from(table).select("*");
  if (error) {
    console.error("Fetch error:", error);
    return;
  }
  console.log(data);
  
  return data;
}






