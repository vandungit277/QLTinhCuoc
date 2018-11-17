USE PowerCall
GO
/*
Author: Dungdv24
Desc: 10/11/2018
Desc: Lấy thông tin chi nhánh
*/
ALTER PROCEDURE Call_GetBrach
@CompanyID INT
AS
BEGIN
SELECT BranchID,BranchName,LocationID FROM dbo.Branch(NOLOCK) WHERE CompanyID = @CompanyID
END




