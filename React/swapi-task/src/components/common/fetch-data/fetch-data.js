const FetchData = async (url, signal) => {
    const response = await fetch(url ,{
        method: "GET",
        signal: signal
    });
    const data = await response.json();

    return data;
};

export default FetchData;