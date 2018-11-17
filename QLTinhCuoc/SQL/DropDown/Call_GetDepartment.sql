USE PowerCall
GO
/*
Author: Dungdv24
Desc:  10/11/2018
Desc: Lấy thông tin phòng ban
*/
ALTER PROCEDURE Call_GetDepartment
@BranchID INT
AS
BEGIN
SELECT DepartmentID,DepartmentName FROM dbo.Department(NOLOCK) WHERE BranchID = @BranchID AND Status =1
END



