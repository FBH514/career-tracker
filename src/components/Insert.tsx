import {useEffect, useState} from "react";

function Insert() {

    const [results, setResults] = useState(0);
    const [location, setLocation] = useState("");
    const [times, setTimes] = useState(0);
    const [fetched, setFetched] = useState(false);
    const api = "http://localhost:8000/v1/careers/";

    function Header () {


        useEffect(() => {
            if (!fetched) {
                fetch(api)
                    .then(response => response.json())
                    .then(data => {
                        setResults(data.length)
                    })
                fetch(api + "data/locations")
                    .then(response => response.json())
                    .then(data => {
                        setLocation(data.name)
                        setTimes(data.value)
                    })
                setFetched(true);
            }
        });

        const date = new Date();
        const formattedDate = date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });

        return(
            <div id={"insert-header"}>
                <div id={"insert-header-wrapper"}>
                    <h1 id={"insert-header-title"}>{formattedDate}</h1>
                    <h2>{location} is the most applied with {times} appearances.</h2>
                    <h2>{results} applications.</h2>
                </div>
            </div>
        );
    }

    const Message = () => {
        return (
            <div className={"message"}>
                <p id={"insert-message"}></p>
            </div>
        );
    }

    const ChangeMessage = (message: string) => {
        const mess = document.getElementById("insert-message");
        mess!.innerHTML = message;
    }

    const ActiveMessage = (bool = false) => {
        const message = document.getElementsByClassName("message")[0];
        if (bool) {
            message.classList.add("active");
            setTimeout(() => {
                message.classList.remove("active");
                ChangeMessage("");
            }, 5000);
        } else {
            message.classList.remove("active");
        }
    }

    function InputFields() {

        const [lock, setLock] = useState(true);

        const [inputValues, setInputValues] = useState({
            title: "",
            location: "",
            employer: "",
            description: "",
            url: ""
        });

        const input = [
            {name: "title", type: "text", placeholder: "Title"},
            {name: "location", type: "text", placeholder: "Location"},
            {name: "employer", type: "text", placeholder: "Employer"},
            {name: "description", type: "text", placeholder: "Description"},
            {name: "url", type: "text", placeholder: "URL"}
        ];

        useEffect(() => {
            if (inputValues.title !== "" && inputValues.location !== "" && inputValues.employer !== "" && inputValues.description !== "" && inputValues.url !== "") {
                setLock(false);
            } else {
                setLock(true);
            }
        }, [inputValues]);

        useEffect(() => {
            const title = document.getElementById("title-preview");
            const location = document.getElementById("location-preview")
            const employer = document.getElementById("employer-preview")
            const description = document.getElementById("description-preview")
            const url = document.getElementById("url-preview")
            const gold = "rgba(85, 142, 248, 0.2)";

            if (inputValues['title'] !== "") {
                title!.innerHTML = inputValues['title'];
                title!.style.color = "#558EF8";
            }
            else {
                title!.innerHTML = "Title";
                title!.style.color = gold;
            }
            if (inputValues['location'] !== "") {
                location!.innerHTML = inputValues['location'];
                location!.style.color = "#558EF8";
            }
            else {
                location!.innerHTML = "Location";
                location!.style.color = gold;
            }
            if (inputValues['employer'] !== "") {
                employer!.innerHTML = inputValues['employer'];
                employer!.style.color = "#558EF8";
            }
            else {
                employer!.innerHTML = "Employer";
                employer!.style.color = gold;
            }
            if (inputValues['description'] !== "") {
                description!.innerHTML = inputValues['description'];
                description!.style.color = "#558EF8";
            }
            else {
                description!.innerHTML = "Description";
                description!.style.color = gold;
            }
            if (inputValues['url'] !== "") {
                url!.innerHTML = inputValues['url'];
                url!.style.color = "#558EF8";
            }
            else {
                url!.innerHTML = "URL";
                url!.style.color = gold;
            }
        }, [inputValues]);

        function POSTData(data: any) {
            fetch('http://localhost:8000/v1/careers/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => {
                if (response.ok) {
                    return response.json();
                }
            }).then(data => {
                console.log(data);
                if (data['status'] === 'Success!') {
                    setInputValues({
                        title: "",
                        location: "",
                        employer: "",
                        description: "",
                        url: ""
                    });
                }
            });
        }

        document.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                const submit = document.getElementById("insert-submit");
                if (submit && !lock) {
                    submit.click();
                }
            }
        });

        return (
            <div id="insert-input-fields">
                <div id="insert-input-fields-wrapper">
                    {input.map((input, index) => {
                        return (
                            <div className="input-field" key={index} id={"input-" + input.name}>
                                <input
                                    value={inputValues[input.name as keyof typeof inputValues]}
                                    type={input.type}
                                    name={input.name}
                                    placeholder={input.placeholder}
                                    onChange={(e) => {
                                        setInputValues({...inputValues, [input.name]: e.target.value});
                                    }}
                                />
                            </div>
                        )
                    })}
                    <div id={"insert-buttons"}>
                        <button
                            className="buttons"
                            id={"insert-reset"}
                            onClick={() => {
                                setInputValues({
                                    title: "",
                                    location: "",
                                    employer: "",
                                    description: "",
                                    url: ""
                                });
                                setFetched(false);
                            }}
                        >Reset</button>
                        <button
                            className="buttons"
                            id={"insert-submit"}
                            type="submit"
                            disabled={lock}
                            onClick={() => {
                                POSTData(inputValues);
                                ChangeMessage("Successfully added a new career!");
                                ActiveMessage(true);
                            }}
                        ></button>
                    </div>
                </div>
            </div>
        );
    }

    function Preview() {

        return (
            <div id="insert-preview">
                <div id="insert-preview-wrapper">
                    <h2 id={"title-preview"}>Title</h2>
                    <h2 id={"location-preview"}>Location</h2>
                    <h2 id={"employer-preview"}>Employer</h2>
                    <h2 id={"description-preview"}>Description</h2>
                    <h2 id={"url-preview"}>URL</h2>
                </div>
            </div>
        )
    }

    function Body() {
        return(
            <div id={"insert-content-body"}>
                <Message/>
                <div id={"insert-content-left"}>
                    <InputFields/>
                </div>
                <div id={"insert-content-right"}>
                    <Preview/>
                </div>
            </div>
        );
    }

    return (
        <div id="insert-content">
            <div id={"insert-content-wrapper"}>
                <Header/>
                <Body/>
            </div>
        </div>
    );
}

export default Insert;