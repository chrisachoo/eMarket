import { useState } from 'react'

export const useMalls = () => {

  const [isLoading, setIsLoading] = useState(null)
  const _url = import.meta.env.VITE_URL_STRING;

  const malls = async () => {
    setIsLoading(true)
    await fetch(`${_url}/mall/get-malls`)
      .then((response) => {
        if (response.ok) {
          console.log({response: response})
          return response.json();
        }
        throw new TypeError("Oops, we haven't got JSON!");
      })
      .then(data => console.log({data: data}) )
      .catch(error => console.error(error))
      .finally(() => {
        setIsLoading(false);
      });
  }

  return { malls, isLoading }
}