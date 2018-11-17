USE PowerCall
GO
/*
Author: Dungdv24
Desc: 11/11/2018
Desc: Quản lý cước gọi
*/
ALTER PROCEDURE Call_Management
    @Search INT, --0 Search theo tất cả,1 search Nội hạt:2 search Liên tỉnh, 3: Di động , 4: Dịch vụ 
	@FromDate VARCHAR(10),
	@ToDate VARCHAR(10)
AS
    BEGIN

        DECLARE @qr NVARCHAR(200) = ' And 1 = 1 '
		 IF @Search = 1 --NỘi hạt
            BEGIN
                SET @qr = ' AND TY.TypeFixedDialID = 1 AND F.LocationID = B.LocationID  '
            END
        IF @Search = 2 --Liên tỉnh
            BEGIN
                SET @qr = ' AND TY.TypeFixedDialID = 1 AND F.LocationID <> B.LocationID'
            END
        IF @Search = 3
            BEGIN
                SET @qr = ' AND TY.TypeFixedDialID = 2';
            END
		IF @Search = 4
            BEGIN
                SET @qr = ' AND TY.TypeFixedDialID = 3';
            END
        DECLARE @query NVARCHAR(MAX) = N'SELECT  S.UserName ,
        IPI.IPPhone [From],
        IPO.PhoneNumber [To] ,
        CD.TotalTimeCalled ,
        CD.Total ,
        LB.LocationName AS [LocationNameFrom] ,
		LF.LocationName AS [LocationNameTo],
        TY.TypeFixedDialName
FROM    dbo.Branch AS B
        JOIN dbo.Department AS D ON D.BranchID = B.BranchID
		JOIN dbo.Location AS LB ON LB.LocationID = B.LocationID
        JOIN dbo.Staff AS S ON S.DepartmentID = D.DepartmentID
        JOIN dbo.IPPhoneInside AS IPI ON IPI.StaffID = S.StaffID
        JOIN dbo.CallDetails AS CD ON CD.StaffID = S.StaffID
        JOIN dbo.IPPhoneOutSide AS IPO ON IPO.IPPhoneOutSide = CD.IPPhoneOutSide
        JOIN dbo.FixedDial AS F ON F.FixedDialID = IPO.FixedDialID
        JOIN dbo.TypeFixedDial AS TY ON TY.TypeFixedDialID = F.TypeFixedDialID
		JOIN dbo.Location AS LF ON LF.LocationID = F.LocationID
		WHERE CONVERT(DATE,CD.TimeStart) BETWEEN '''+@FromDate+''' AND '''+@ToDate+'''
     ' + @qr +N' ORDER BY   CD.Total '
        PRINT @query
        EXEC sp_executesql @query

    END

	

	