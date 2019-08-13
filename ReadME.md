For First time open:
`npm install`

Then 
`npm run dev`




SELECT t.taxid as taxRate,p.payment as paytype,c.name as customerName, c.id as customerId,r.datenew as date,p.total as sales
         FROM  ticketlines as t, receipts  as r, payments as p, tickets as tc, customers as c
         WHERE t.ticket = r.ID 
         and t.ticket = tc.id
         and tc.customer = c.id
         and p.receipt = t.ticket
         And t.product is null 