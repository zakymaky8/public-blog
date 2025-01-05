const Fetch = async () => {
    const res = await fetch("http://localhost:3456/");
    const data = await res.json()
  return (
    <div>Fetched: {data.message}</div>
  )
}

export default Fetch