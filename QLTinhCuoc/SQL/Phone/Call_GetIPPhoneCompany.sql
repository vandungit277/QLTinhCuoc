USE PowerCall
GO
/*
Author: Dungdv24
Desc: 07/11/2018
Desc: Thông tin các số nội bộ theo chi nhánh
*/
CREATE PROCEDURE Call_GetIPPhoneCompany
@UserName VARCHAR(100)
AS
BEGIN
DECLARE @BranchID INT

SELECT @BranchID = B.BranchID FROM (SELECT * FROM dbo.Staff(NOLOCK) WHERE UserName = @UserName) AS ST
JOIN dbo.Department(NOLOCK) AS D ON D.DepartmentID = ST.DepartmentID
JOIN dbo.Branch(NOLOCK) AS B ON B.BranchID = D.BranchID

SELECT  ST.StaffName ,
        ST.UserName ,
        ST.Email ,
        C.CompanyName ,
        b.BranchName ,
        D.DepartmentName ,
        IP.IPPhone ,
        S.NameServiceProvider
FROM    ( SELECT    *
          FROM      dbo.Staff(NOLOCK)
        ) AS ST
        JOIN dbo.IPPhoneInside(NOLOCK) AS IP ON IP.StaffID = ST.StaffID
        JOIN dbo.ServiceProvider(NOLOCK) AS S ON S.ServiceProviderID = IP.ServiceProviderID
        JOIN dbo.Department(NOLOCK) AS D ON D.DepartmentID = ST.DepartmentID
        JOIN dbo.Branch(NOLOCK) AS B ON B.BranchID = D.BranchID
        JOIN dbo.Company(NOLOCK) AS C ON C.CompanyID = B.CompanyID
WHERE   ST.Status = 1
        AND IP.Status = 1
		AND b.BranchID =@BranchID
END

