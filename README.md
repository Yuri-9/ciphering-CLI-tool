# Ciphering-CLI-tool

The Ciphering CLI Tool allows you to encode and decode text by 3 substitution ciphers

CLI tool accepts 3 options:

1.  **-c, --config**: config for ciphers Config is a string like this `"C1-C1-R0-A-C1"` with different sequence and number of ciphers, where:

- `C` is for Caesar cipher (with shift 1)
- `A` is for Atbash cipher
- `R` is for ROT-8 cipher
- `1` is for encoding (only for Caesar cipher and ROT-8 cipher)
- `0` is for decoding (only for Caesar cipher and ROT-8 cipher)

2.  **-i, --input**: a path to input file
3.  **-o, --output**: a path to output file

### Note:

- If the input file option `-i` or `--input` is missed the input comes from the console.
- If the output file option `-o` or `--output` is missed the output comes to the console.

**Usage example:**

```bash
$ node my_ciphering_cli.js -c "C1-C0-A-R1-R0-A-R0-R0-C1-A" -i "./input.txt" -o "./output.txt"
```

> input.txt `This is secret. Message about "_" symbol!`
> output.txt `Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!`
