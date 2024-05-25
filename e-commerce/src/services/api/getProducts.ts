async function getProducts() {
  const myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer 5ZxC-QnMwjTY_kXcqNwT92dmI9r2IRUC');

  // const urlencoded = new URLSearchParams();

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    // body: urlencoded,
  };

  const answer = await fetch(
    'https://api.us-central1.gcp.commercetools.com/e-commerce-asinc/products?limit=8&offset=2&sort=masterData.current.name.en asc',
    requestOptions
  );

  const result = await answer.json();

  return result;
}

export default getProducts;
