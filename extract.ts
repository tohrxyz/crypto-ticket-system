import fs from 'fs';

type DataArray = {
  email: string;
  invoiceID: string;
}

// Extracts emails from a BTC Pay Server invoice export
// and writes them to a file.

// Usage: bun extract.ts <event_id>

export const extract = () => {
  const args = process.argv.slice(2);
  const inputPath = './inputData/btc_pay_invoice_export.json';

  if (!inputPath) {
    throw new Error('No file path provided!');
  }
  if (!fs.existsSync(inputPath)) {
    throw new Error('File does not exist!');
  }
  if (!inputPath.endsWith('.json')) {
    throw new Error('File is not a JSON file!');
  }
  if (args.length < 1) {
    throw new Error('No event id provided!');
  }

  const eventId = args[0];

  const fileContent = fs.readFileSync(inputPath, 'utf8');

  const parsedFileContent = JSON.parse(fileContent);

  const emails: string[] = [];
  const invoiceIDs: string[] = [];
  const filtered = parsedFileContent.filter(
    (item: any) => item.InvoiceItemCode === eventId && 
    (
      item.InvoiceFullStatus === 'Settled' || 
      item.InvoiceFullStatus === "Settled (paidOver)"
    )
  );

  let numOfEmails = 0;

  filtered.map((item: any) => {
    numOfEmails++;
    emails.push(item.BuyerEmail);
    invoiceIDs.push(item.InvoiceId);
  });

  const dataArray: DataArray[] = [];

  emails.map((email: string, index: number) => {
    dataArray.push({
      email,
      invoiceID: invoiceIDs[index],
    });
  });
  const output = JSON.stringify(dataArray);

  fs.writeFileSync('./outputData/extracted_emails.json', output, 'utf-8');
  
  console.log(`Successfully extracted ${numOfEmails} emails!`)
  console.log(`Output written to ./outputData/extracted_emails.json`)
}

extract();