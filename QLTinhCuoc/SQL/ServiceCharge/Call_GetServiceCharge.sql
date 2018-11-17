USE PowerCall
GO
/*
Author: Dungdv24
Desc: 07/11/2018
Desc: Lấy thông tin nhà cung cấp - giá cước
*/
ALTER PROCEDURE Call_GetServiceCharge
AS
BEGIN
SELECT  Se.ServiceProviderID,
		Se.TypeCallID,
		S.NameServiceProvider ,
        Se.block1 ,
        Se.price1 ,
        Se.block2 ,
        se.price2 ,
        T.NameTypeCall
FROM    dbo.ServiceProvider(NOLOCK) AS S
        JOIN dbo.ServiceCharge(NOLOCK) AS Se ON Se.ServiceProviderID = S.ServiceProviderID
        JOIN dbo.TypeCall(NOLOCK) AS T ON T.TypeCallID = Se.TypeCallID
WHERE   Se.Status = 1
ORDER BY NameServiceProvider
       

END

