For First time open:
`npm install`

Then 
`npm run dev`




SELECT  t.ticket as ticketId, 
p.payment as paytype,
pp.name as user, pp.id as userId,
r.datenew as date, 
Round((t.units*t.price*(1+(select rate from taxes where taxes.id = t.taxid))),2) as sales

        FROM  ticketlines as t, receipts  as r, payments as p, tickets as tc, customers as c, people as pp
         WHERE t.ticket = r.ID 
         and t.ticket = tc.id
         and tc.customer = c.id
         and p.receipt = t.ticket
         and pp.id = tc.person
         And t.product is null 