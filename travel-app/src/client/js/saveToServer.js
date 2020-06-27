const saveToServer = async (apiData) => {
    // post to local server with the api data obtained from client side
    const response = await fetch("http://localhost:8000/saveData", {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
    });
}

export { saveToServer }