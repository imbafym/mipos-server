For First time open:
`npm install`

Then 
`npm run dev`




 select  p.name as productName, c.NAME as customerName, c.ID as CustomerId , cat.Name as CategoryName, Sum(Round( (p.pricesell - tl.PRICE)*tl.units*(1+(select rate from taxes where taxes.id = tl.TAXID) ),2)) as discount, Sum(tl.UNITS) as qty, Sum(Round( tl.price*tl.units*(1+(select rate from taxes where taxes.id = tl.TAXID) ),2)) as sale
        from tickets t, ticketlines tl, products p, receipts r, categories cat,customers c
        where  p.category = cat.id
        and c.id = t.customer
        and tl.ticket = r.id
        and t.id = tl.ticket
        and tl.product = p.id
        and date(r.datenew) between ? and ?
        group by p.Name,tl.TAXID, c.id
          