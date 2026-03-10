import sys
from . import cli

def run() -> None:
    """
    Starts the main CLI loop.
    """
    print("Welcome to the Todo CLI App!")
    print("Available commands: add, list, update, delete, complete, exit")
    
    while True:
        try:
            command = input("\ntodo> ").strip().lower()
            
            if command == "add":
                cli.handle_add()
            elif command == "list":
                cli.handle_list()
            elif command == "complete":
                cli.handle_complete()
            elif command == "delete":
                cli.handle_delete()
            elif command == "update":
                cli.handle_update()
            elif command == "exit":
                print("Goodbye!")
                sys.exit(0)
            elif not command:
                continue
            else:
                print(f"Unknown command: '{command}'. Type 'add', 'list', or 'exit'.")
                
        except (KeyboardInterrupt, EOFError):
            print("\nGoodbye!")
            sys.exit(0)

if __name__ == "__main__":
    run()
