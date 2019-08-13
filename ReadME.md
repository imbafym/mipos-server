For First time open:
`npm install`

Then 
`npm run dev`




    select  day(r.Datenew)as day, count(t.id) as tran, sum(p.total) as total from payments p, tickets t, receipts r 
          where p.receipt = r.id
          and month(r.Datenew) = Month(curdate())   
          and year(r.Datenew) = Year(curdate())   
            and p.payment <> "cashout" and p.payment <> "cashin"   
          and p.payment <> "paper out"   
          and t.id = r.id
          group by day(r.datenew)
          