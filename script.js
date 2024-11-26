const randomPromise = new Promise((resolve, reject) => {
    const random = Math.random();
    if (random > 0.5) {
      resolve("Promise resolved!");
    } else {
      reject("Promise rejected!");
    }
  });
  
  const fetchFasterData = async () => {
    const url1 = "https://dummyjson.com/users";
    const url2 = "https://jsonplaceholder.typicode.com/users";
    
    const fetchRequest1 = fetch(url1).then(response => response.json());
    const fetchRequest2 = fetch(url2).then(response => response.json());
    
    const response = await Promise.race([fetchRequest1, fetchRequest2]);
    return response;
  };
  
  const promise1 = new Promise((resolve) => {
    setTimeout(() => resolve([1, 2, 3]), 2000);
  });
  
  const promise2 = new Promise((resolve) => {
    setTimeout(() => resolve([4, 5, 6]), 1000);
  });
  
  const promise3 = new Promise((_, reject) => {
    setTimeout(() => reject("Promise 3 rejected"), 1500);
  });
  
  const mergeResolvedArrays = async () => {
    const results = await Promise.allSettled([promise1, promise2, promise3]);
    const resolvedArrays = results
      .filter(result => result.status === "fulfilled")
      .map(result => result.value);
  
    return [].concat(...resolvedArrays);
  };
  
  const fetchCombinedData = async () => {
    const url1 = "https://fakestoreapi.com/users";
    const url2 = "https://jsonplaceholder.typicode.com/users";
    
    try {
      const [response1, response2] = await Promise.all([fetch(url1).then(res => res.json()), fetch(url2).then(res => res.json())]);
      return [...response1, ...response2];
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const combineAllTasks = async () => {
    try {
      randomPromise
        .then(result => console.log(result))
        .catch(error => console.error(error));
  
      const fasterData = await fetchFasterData();
      console.log("Faster API Response:", fasterData);
  
      const mergedArrays = await mergeResolvedArrays();
      console.log("Merged Arrays from Promises:", mergedArrays);
  
      const combinedData = await fetchCombinedData();
      console.log("Combined Data from APIs:", combinedData);
  
    } catch (error) {
      console.error("Error in combining tasks:", error);
    }
  };
  
  combineAllTasks();
  