For First time open:
`npm install`

Then 
`npm run dev`



         select 
         p.name as productName, cat.Name as CategoryName, Round( (p.pricesell - tl.PRICE)*tl.units*(1+(select rate from taxes where taxes.id = tl.TAXID) ),2)  as discount, 
         tl.UNITS as qty, Round( tl.price*tl.units*(1 + (select rate from taxes where taxes.id = tl.TAXID) ),2)as sale   

          from tickets t, ticketlines tl, products p, receipts r, categories cat   
          where  p.category = cat.id   
          and tl.ticket = r.id   
          and t.id = tl.ticket   
          and tl.product = p.id   
          and date(r.datenew) between curdate()  and curdate();
          
