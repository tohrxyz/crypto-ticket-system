# crypto-ticket-system
A set of tools for running an e-shop for event tickets using BTCPayServer

# Tools
## Extract
Extracting email and invoice id for a specific event from the whole json export of invoices from BTCPayServer
1. Go to your BTCPayServer, click on Invoices on the left sidebar, click export as json.
2. Select everything on the page using Ctrl + A
3. Copy it using Ctrl + C
4. Create a file `btc_pay_invoice_export.json` inside `inputData` folder
5. Paste the previously copied json into this newly created file.
6. Hit save.
7. Run
```sh 
bun extract.ts <event id>
```

The expected output after running this command is something like:
```
Successfully extracted {x} emails!
Output written to ./outputData/extracted_emails.json
```
