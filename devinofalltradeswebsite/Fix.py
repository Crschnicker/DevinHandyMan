#!/usr/bin/env python3

import os
import sys

def create_empty_files(file_paths):
    """Create empty files if they don't exist."""
    for file_path in file_paths:
        if not os.path.isfile(file_path):
            # Create directory structure if needed
            directory = os.path.dirname(file_path)
            if directory and not os.path.exists(directory):
                os.makedirs(directory)
            
            # Create empty file
            with open(file_path, 'w') as f:
                pass  # Just open and close to create an empty file
            print(f"Created empty file: {file_path}")
        else:
            print(f"File already exists: {file_path}")
    
    print("All specified files now exist.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("No files specified. Usage: python create_empty_files.py file1 file2 ...")
        sys.exit(1)
    
    create_empty_files(sys.argv[1:])