import { useCallback, useEffect, useState } from "react";

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

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length); // Corrected random generation
      pass += str.charAt(char);
    }
    setPassword(pass);
  });

  // useEffect(() => {
  // }, [length, number, character]);

  const generatePassword = () => {
    passwordGenerator();
    setCopyToClipBoard(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(
      () => {
        setCopyToClipBoard(true);
        // alert("Password copied to clipboard!");
      },
      (error) => {
        alert("Failed to copy password:", error);
      },
    );
  };

  return (
    <div className="transition-all  flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <h1 className="mb-8 text-center text-5xl font-extrabold text-white md:text-6xl">
        Password Generator
      </h1>
      <div className="flex h-full w-4/5 max-w-md flex-col items-center rounded-lg bg-white p-10 shadow-lg xs:flex-col">
        <div className="mb-4 flex w-full">
          <input
            className={`h-12 flex-grow rounded-l-lg ${password.length >= 6 ? "rounded-l-lg" : "rounded-lg"} bg-gray-200 p-2 text-gray-500 focus:outline-none`}
            value={password || "Password"}
            type="text"
            disabled
          />

          {password.length >= 6 ? (
            <button
              className={`h-12 w-24 rounded-r-lg text-white transition-colors duration-150 ${
                copyToClipBoard ? "bg-green-500" : "bg-blue-500"
              }`}
              onClick={copyToClipboard}
            >
              {copyToClipBoard ? "Copied" : "Copy"}
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="flex gap-4">
          <button
            className="mb-2 h-[40px] w-[100px] rounded-lg bg-indigo-400 font-bold text-white"
            onClick={generatePassword}
          >
            Generate
          </button>
          <div className=" flex items-center gap-1">
          
            <label className="pb-1 text-gray-600 text-md" htmlFor="resetId">Reset:</label>
          <img
          id="resetId"
            onClick={() => {
              // setLength("");
              setPassword("")
              setLength("8")
              setNumber(false)
              setCharacter(false)
            }}
            className=" cursor-pointer"
            src="public/history_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
            alt=""
          />
          </div>
        </div>
        <div className="mb-4 flex w-full flex-col items-center sm:flex-row">
          <input
            type="range"
            min={8}
            max={16}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="flex-grow"
          />
          <span className="ml-2 text-gray-700">Length: {length}</span>
        </div>
        <div className="flex w-full flex-col items-center justify-between font-semibold text-gray-700 sm:flex-row">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={number}
              onChange={() => setNumber((prev) => !prev)}
              className="mr-2"
            />
            Include Numbers
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={character}
              onChange={() => setCharacter((prev) => !prev)}
              className="mr-2"
            />
            Include Symbols
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
