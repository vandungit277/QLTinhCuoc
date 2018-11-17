USE PowerCall
GO
/*
Author: Dungdv24
Desc:  10/11/2018
Desc: Lấy thông tin công ty
*/
ALTER PROCEDURE Call_GetCompany
AS
BEGIN
SELECT CompanyID,CompanyName FROM dbo.Company(NOLOCK)
END

