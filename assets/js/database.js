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
// fetchDocData("doctors_data");


export async function addProduct(
  title,
  long_des,
  short_des,
  price,
  brand,
  category,
  images_urls
) {
  let { data, error } = await supabaseApi
    .from("products")
    .insert([
      { title, long_des, short_des, price, brand, category, images_urls },
    ]);

  if (error) {
    console.error("Insert error:", error);
    return false;
  }
  console.log(data);
  return true;
}

export async function updateProduct(table, id, updatedData) {
  const updateData = {};

  for (const key in updatedData) {
    if (updatedData[key] !== undefined) {
      updateData[key] = updatedData[key];
    }
  }

  const { data, error } = await supabaseApi
    .from(table)
    .update(updateData)
    .eq("id", id);

  if (error) {
    console.error("Update failed:", error);
    return { error };
  }

  return { data };
}

export async function deleteProduct(table, id) {
  let { error } = await supabaseApi.from(table).delete().eq("id", id);

  if (error) console.error("Delete error:", error);
  return { error };
}
