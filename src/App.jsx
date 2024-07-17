import { useCallback, useState, useEffect, useRef } from "react";

function App() {
  const [Length, setLength] = useState(6);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setpassword] = useState("");

  const passwordgenrator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) {
      str += "0123456789";
    }
    if (char) {
      str += "!@#$%^&*";
    }

    for (let i = 1; i <= Length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setpassword(pass);
  }, [Length, number, char, setpassword]);

  const passwordRef = useRef(null);

  const copyPassToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordgenrator();
  }, [Length, number, char, passwordgenrator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-lg rounded-lg px-6 py-8 my-10 text-orange-500 bg-gradient-to-r from-gray-700 to-gray-900">
        <h1 className="text-white text-center my-6 text-3xl font-extrabold">Password Generator</h1>

        <div className="flex shadow-inner rounded-lg overflow-hidden mb-6 bg-gray-900">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-3 px-4 bg-transparent text-white placeholder-gray-500"
            placeholder="Generated Password"
            ref={passwordRef}
            readOnly
          />
          <button
            onClick={copyPassToClipboard}
            className="bg-blue-600 text-white outline-none px-4 py-3 shrink-0 hover:bg-blue-700 transition-all duration-200 ease-in-out"
          >
            Copy
          </button>
        </div>

        <div className="space-y-6 text-sm">
          <div className="flex items-center justify-between">
            <label className="text-white font-medium">Length: {Length}</label>
            <input
              type="range"
              min={6}
              max={100}
              value={Length}
              className="cursor-pointer accent-blue-600 w-3/4"
              onChange={(event) => setLength(event.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                defaultChecked={number}
                id="numberInput"
                onChange={() => setNumber((prev) => !prev)}
                className="accent-blue-600"
              />
              <label htmlFor="numberInput" className="text-white font-medium">Include Numbers</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                defaultChecked={char}
                id="charInput"
                onChange={() => setChar((prev) => !prev)}
                className="accent-blue-600"
              />
              <label htmlFor="charInput" className="text-white font-medium">Include Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
