import { useCallback, useEffect, useState } from "react";
// import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState("8");
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [copyToClipBoard, setCopyToClipBoard] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "1234567890";
    if (character) str += "!#$%&'*+,-./:;<=>?@^_|~";

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random(str) * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, number, character, setPassword]);

  useEffect(() => {
    passwordGenerator();
    setCopyToClipBoard(false);
  }, [length, number, character, setPassword]);

  const copyToClipboard = () => {
    setCopyToClipBoard(true);
    navigator.clipboard.writeText(password).then(
      () => {
        alert("Password copied to clipboard!");
      },
      (error) => {
        alert("Failed to copy password:", error);
      },
    );
  };

  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-red-400">
        <h1 className="mb-8 text-6xl font-extrabold">Password Generator</h1>
        <div className="flex h-fit flex-col items-center justify-center rounded-lg bg-gray-500 p-10">
          <div className="">
            <input
              className="h-[40px] w-[300px] justify-end rounded-l-lg bg-black p-2 text-white"
              value={password ? password : "Password"}
              type="text"
              min={8}
              max={16}
              disabled
              onChange={(e) => {
                setLength(e.target.length);
              }}
            />
            <button
              className={`text-white ${
                copyToClipBoard ? "bg-green-400" : "bg-red-400"
              } h-[40px] w-[60px] rounded-r-lg text-center`}
              onClick={copyToClipboard}
            >
              {copyToClipBoard ? "Copied" : "Copy"}
            </button>
          </div>
          <br />
          <div className="flex items-center justify-center gap-4 font-bold text-red-400">
            <div className="flex flex-row gap-1">
              <input
                className=""
                type="range"
                min={8}
                max={16}
                value={length}
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label>Length: {length}</label>
            </div>

            <div className="flex flex-row gap-1">
              <input
                type="checkbox"
                name="number"
                id="number123"
                onChange={() => setNumber((prev) => !prev)}
              />
              <label htmlFor="number123">Number</label>
            </div>
            <div className="flex flex-row gap-1">
              <input
                type="checkbox"
                name="character"
                id="character123"
                onChange={() => setCharacter((prev) => !prev)}
              />
              <label htmlFor="character123">Character</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
