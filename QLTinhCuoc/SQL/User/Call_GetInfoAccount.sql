/*
Author: Dungdv24
Date: 05/11/2018
Desc: Lấy thông tin tài khoản.
*/

ALTER PROC Call_GetInfoAccount
@UserName VARCHAR(100)
AS
BEGIN	
SELECT	  S.StaffID ,
          S.Status ,
          S.StaffName ,
          S.Birthdays ,
          S.Address ,
          S.Passport ,
          S.DayIn ,
		  S.Email,
		  S.PhoneNumber,
		  se.SexID,
          Ro.RoleName ,
          S.UserName ,
		  ip.IPPhone,
		  B.BranchName,
		  D.DepartmentName,
		  C.CompanyName
FROM (SELECT * FROM dbo.Staff WHERE UserName = @UserName) AS s
JOIN dbo.Sex AS se ON se.SexID = s.SexID
JOIN dbo.Department AS D ON D.DepartmentID = s.DepartmentID
JOIN dbo.Branch AS B ON B.BranchID = D.BranchID
JOIN dbo.Company AS C ON C.CompanyID = B.CompanyID
JOIN dbo.Role AS Ro ON Ro.RoleID = s.RoleID
LEFT JOIN dbo.IPPhoneInside AS IP ON IP.StaffID = s.StaffID

END

