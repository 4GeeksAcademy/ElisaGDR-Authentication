const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			email: "",
			isLogin: false,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			login: async (email, password) => {
					// fetching data from the backend
					const options = {method: "POST", 
					                 headers: {"Content-Type": "application/json"},
				                   body: JSON.stringify({"email": email, "password": password})
									}
					const response = await fetch(process.env.BACKEND_URL + "/api/login", options)
					if (!response.ok ){
						if (!response.status == 401) {
							console.log("Error loading message from backend", response.status, response.statusText)
							return {status: response.status, statusText: response.statusText}
						}
						const data = await response.json()
						setStore({ message: data.message })
						return data;
				  }
					const data = await response.json()
          localStorage.setItem("token", data.access_token)
					setStore({ email: email });
					setStore({ isLogin: true });
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				
			},
			protected: async () => {
				const url = process.env.BACKEND_URL + "/api/protected";
				const options = {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${localStorage.getItem('token')}`
					}
				};
				const response = await fetch(url, options);
				if (!response.ok) {
					console.log("Error loading message from backend", response.status, response.statusText)
					return {status: response.status, statusText: response.statusText};
				}
				const data = await response.json();
				return data;
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
