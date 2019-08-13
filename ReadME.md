For First time open:
`npm install`

Then 
`npm run dev`




 SELECT 
 day(r.Datenew) as day,
 sum(p.total) as total,
 count(p.TRANSID) as tran, 
 (sum(p.total)/count(p.TRANSID) ) as avg 
 FROM receipts as r,payments as p , tickets t
          
          where month(r.Datenew) = Month(curdate())   
          and year(r.Datenew) = Year(curdate())   
          and p.receipt = r.id   
          and t.id = p.receipt
          and p.payment <> "cashout" and p.payment <> "cashin"   
          and p.payment <> "paper out"   
          group by day(r.Datenew); 
          