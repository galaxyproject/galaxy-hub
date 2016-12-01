 

# Galaxy Tool Executable

When adapting an executable for use with Galaxy, you can use an existing one or you can create your own. If you don't have access to the source code for your executable, you may want to look at creating [custom code](Admin%2FTools%2FCustom+Code) wrappers around it. If you're writing a new executable or have access to the source for an existing one, there are some things you may want to keep in mind.

## Types of Executables Allowed

Galaxy supports any binary file that can run natively on the server where it is running, or any code with an interpreter on that machine. For example, executables can be written in Perl, Python, etc., as long as an interpreter is available. For interpreted files on a Unix system, one can either use the standard shebang notation (and chmod +x) or an interpreter can be specified in the XML file.

## Inputing and Outputing Files

Your executable can input and output any type of file that Galaxy supports, or a custom file of your own choosing. Currently supported formats include:

- _interval_ or _bed_ format for specifying genomic coordinates 
- _fasta_ format for sequence data 
- _axt_ format for alignments 

To inform Galaxy about what format you are using, you should specify it in the XML file. While you can output an arbitrary text file, if you want users to be able to perform further Galaxy operations on it (like joining it with the results from another analysis), you should consider outputing more than one file: a standard-format file like interval or bed and an arbitrary file containing more complex data.

Input and output file names will be passed to the executable through the command line, with command line notation being specified in the XML file. You can use your language's standard file-opening and processing methods, but you will need to accept variable file names and locations specified by Galaxy.

