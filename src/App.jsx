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

  const generatePassword = () =>{

    passwordGenerator();
    setCopyToClipBoard(false);
  }
  

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(
      () => {
        setCopyToClipBoard(true);
        // alert("Password copied to clipboard!");
      },
      (error) => {
        alert("Failed to copy password:", error);
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center  min-h-screen w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <h1 className="text-5xl md:text-6xl font-extrabold text-center text-white mb-8">Password Generator</h1>
      <div className="bg-white rounded-lg shadow-lg p-10 max-w-md w-4/5 h-full flex flex-col items-center xs:flex-col">
        <div className="flex w-full mb-4 ">
          <input
            className={`flex-grow h-12 rounded-l-lg  ${password.length >= 6 ? "rounded-l-lg":"rounded-lg"} bg-gray-200 text-gray-800 p-2 focus:outline-none`}
            value={password || "Password"}
            type="text"
            disabled
          />

          {password.length >= 6 ? <button
            className={`h-12 w-24 rounded-r-lg text-white transition-colors duration-150 ${
              copyToClipBoard ? "bg-green-500" : "bg-blue-500"
            }`}
            onClick={copyToClipboard}
          >
            {copyToClipBoard ? "Copied" : "Copy"}
          </button>:""}
          
        </div>
        <div>
          <button className="h-[40px] w-[100px] bg-indigo-400 rounded-lg mb-2 text-white font-bold"
          onClick={generatePassword}>
            Generate
          </button>
        </div>
        <div className="flex flex-col sm:flex-row items-center w-full mb-4">
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
        <div className="flex flex-col sm:flex-row items-center justify-between w-full text-gray-700 font-semibold">
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
