const url = import.meta.env.VITE_API_URL

export async function getAllUnits()  {
  const res = await fetch(url);
  const jsonData = await res.json();
  
  // Removes units outside pattern from list
  const filteredLocations = jsonData.locations.filter((location: { opened: boolean }) => location.opened != undefined)

  const correctedData = {...jsonData, locations: filteredLocations}
  return correctedData;
}