"use server";

import { baseUrl } from "../utils/baseUrl";

//! FIX add return's type

/**
 * Fetches data from the API using infinite scroll parameters.
 *
 * @param {string} url - The URL of the API endpoint.
 * @param {number} currentPage - The current page number.
 * @param {number} limit - The number of items to return per page.
 * @param {string} sort - The sorting order of the data.
 * @param {number} priceFrom - The minimum price of the items to return.
 * @param {number} priceTo - The maximum price of the items to return.
 * @param {string} category - The category of the items to return(optional).
 * @return {object} The fetched data in JSON format.
 */
export async function getDataInfinitiveScroll(
  url: string,
  currentPage: number,
  limit: number,
  sort: string,
  priceFrom: number,
  priceTo: number,
  category?: string,
  search?: string,
) {
  try {
    let completedUrl = `${baseUrl}/api/${url}?page=${currentPage}&limit=${limit}&sort=${sort}&price[lte]=${priceFrom}&price[gte]=${priceTo}`;

    if (category) {
      completedUrl = `${completedUrl}&category=${category}`;
    } else if (search) {
      completedUrl = `${completedUrl}&search=${search}`;
    }

    const data = await fetch(completedUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 420 },
      method: "GET",
    }).then((res) => res.json());

    return data;
  } catch (error) {
    console.error(error);
  }
}
