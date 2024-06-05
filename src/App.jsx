import Terminal, {
  ColorMode,
  TerminalInput,
  TerminalOutput,
} from "react-terminal-ui";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [terminalLineData, setTerminalLineData] = useState([
    <TerminalOutput>CIA OPERATING SYSTEM</TerminalOutput>,

    <TerminalOutput></TerminalOutput>,
    <TerminalOutput>
      ----------------------------------------------------
    </TerminalOutput>,
    <TerminalOutput>Welcome to CIA OS v1.0.0</TerminalOutput>,
    <TerminalOutput>
      ----------------------------------------------------
    </TerminalOutput>,
    <TerminalOutput>Developed by: Central Intelligence Agency</TerminalOutput>,
    <TerminalOutput>Build Date: June 3, 2024</TerminalOutput>,
    <TerminalOutput>
      ----------------------------------------------------
    </TerminalOutput>,
    <TerminalOutput>
      This system is classified and intended for authorized
    </TerminalOutput>,
    <TerminalOutput>
      personnel only. Unauthorized access is prohibited.
    </TerminalOutput>,
    <TerminalOutput>
      ----------------------------------------------------
    </TerminalOutput>,
    <TerminalOutput></TerminalOutput>,
    <TerminalOutput>Type 'help' to see available commands.</TerminalOutput>,
    <TerminalOutput>Type 'login' to access the system.</TerminalOutput>,
    <TerminalOutput>Type 'exit' to close the terminal.</TerminalOutput>,
    <TerminalOutput>
      ----------------------------------------------------
    </TerminalOutput>,
  ]);

  //Create file system
  const [fs, setFs] = useState({
    "/": {
      type: "dir",
      children: {
        "top-secret": {
          type: "dir",
          children: {
            "nuclear-codes": {
              type: "file",
              content: "123456",
            },
            "agent-list": {
              type: "file",
              content: "Agent 1\nAgent 2\nAgent 3",
            },
          },
        },
        "public": {
          type: "dir",
          children: {
            "info": {
              type: "file",
              content: "This is a public file.",
            },
          },
        },
        "usr": {
          type: "dir",
          children: {
            home: {
              type: "dir",
              children: {
                "file1": {
                  type: "file",
                  content: "This is file 1.",
                },
                "file2": {
                  type: "file",
                  content: "This is file 2.",
                },
              },
            },
          },
        },
      },
    },
  });
  const [currentDir, setCurrentDir] = useState("/usr/home");

  const Commands = [
    {
      command: "ls",
      description: "List directory contents",
      exec: (args, callback) => {
        let dir = args[0] || currentDir;
        let current = fs["/"];
        if (dir === "/") {
          callback(Object.keys(current.children).join("\n"));
          return;
        } else if (dir.startsWith("../")) {
          let d = dir.split("/").slice(1);
          let p = currentDir.split("/").slice(0, -d.length).join("/");
          current = fs[p];
          dir = d.join("/");
        }
        console.log(current)
        for (let d of dir.split("/").slice(1)) {
          if (!current.children[d]) {
            callback(`No such directory: ${d}`);
            return;
          }
          current = current.children[d];
        }
        if (current.type === "dir") {
          callback(Object.keys(current.children).join("\n"));
        } else {
          callback("Not a directory.");
        }
      },
    },
    {
      command: "cd",
      description: "Change the current directory",
      exec: (args, callback) => {
        //TODO Implement directory change
      },
    },
    {
      command: "mkdir",
      description: "Create a new directory",
      exec: (args, callback) => {
        //TODO Implement directory creation
      },
    },
    {
      command: "cf",
      description: "Create a new file",
      exec: (args, callback) => {
        //TODO Implement file creation
      },
    },
    {
      command: "rm",
      description: "Remove a directory or file",
      exec: (args, callback) => {
        //TODO Implement directory removal
      },
    },
    {
      command: "prnt",
      description: "Print the contents of a file",
      exec: (args, callback) => {
        //TODO Implement file printing
      },
    },
    {
      command: "clear",
      description: "Clear the terminal screen",
      exec: (args, callback) => {
        //TODO Implement terminal clearing
      },
    },
    {
      command: "help",
      description: "List available commands",
      exec: (args, callback) => {
        callback(
          Commands.map((c) => `${c.command} - ${c.description}`).join("\n")
        );
      },
    }
  ];

  const onInput = (input) => {
    let ld = [...terminalLineData];
    ld.push(<TerminalInput>{input}</TerminalInput>);
    let command = input.split(" ")[0];
    let args = input.split(" ").slice(1);
    let cmd = Commands.find((c) => c.command === command);
    if (cmd) {
      cmd.exec(args, (output) => {
        ld.push(<TerminalOutput>{output}</TerminalOutput>);
        setTerminalLineData(ld);
      });
    } else {
      ld.push(
        <TerminalOutput>
          Command not found. Type 'help' to see available commands.
        </TerminalOutput>
      );
    }
    setTerminalLineData(ld);
  };
  return (
    <div className="App">
      <div className="Terminal">
        <Terminal
          name="156.244.78.9"
          colorMode={ColorMode.Dark}
          onInput={onInput}
          prompt={"cia@156.244.78.9["+currentDir+"]$"}
        >
          {terminalLineData}
        </Terminal>
      </div>
    </div>
  );
}

export default App;
