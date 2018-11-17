USE PowerCall
GO
/*
Author: Dungdv24
Desc: 11/11/2018
Desc: Báo cáo chi tiết cuộc gọi theo Top
*/
CREATE PROCEDURE Call_TopsRP
    @Search INT , --1 Thời gian đàm thoại,2 Chi phí
    @Top VARCHAR(30) ,
    @FromDate VARCHAR(10) ,
    @ToDate VARCHAR(10)
AS
    BEGIN
        DECLARE @qr NVARCHAR(200) = ' And 1 = 1 ';
        IF @Search = 1 --Thời gian đàm thoại
            BEGIN
                SET @qr = N'  ORDER BY Total DESC'
            END
        IF @Search = 2 --Chi phí
            BEGIN
                SET @qr = N'  ORDER BY TotalTimeCalled DESC'
            END

        DECLARE @query NVARCHAR(MAX) = N'SELECT TOP ' + @Top
            + '  S.UserName ,
        IPI.IPPhone [From],
        IPO.PhoneNumber [To] ,
        CD.TotalTimeCalled ,
        CD.Total ,
        LB.LocationName AS [LocationNameFrom] ,
		LF.LocationName AS [LocationNameTo],
        TY.TypeFixedDialName,
		C.CompanyName,
		B.BranchName,D.DepartmentName
		FROM    dbo.Company AS C
		JOIN dbo.Branch AS B ON B.CompanyID = C.CompanyID
        JOIN dbo.Department AS D ON D.BranchID = B.BranchID
		JOIN dbo.Location AS LB ON LB.LocationID = B.LocationID
        JOIN dbo.Staff AS S ON S.DepartmentID = D.DepartmentID
        JOIN dbo.IPPhoneInside AS IPI ON IPI.StaffID = S.StaffID
        JOIN dbo.CallDetails AS CD ON CD.StaffID = S.StaffID
        JOIN dbo.IPPhoneOutSide AS IPO ON IPO.IPPhoneOutSide = CD.IPPhoneOutSide
        JOIN dbo.FixedDial AS F ON F.FixedDialID = IPO.FixedDialID
        JOIN dbo.TypeFixedDial AS TY ON TY.TypeFixedDialID = F.TypeFixedDialID
		JOIN dbo.Location AS LF ON LF.LocationID = F.LocationID
		WHERE CONVERT(DATE,CD.TimeStart) BETWEEN ''' + @FromDate + ''' AND '''
            + @ToDate + '''
     ' + @qr
        PRINT @query
        EXEC sp_executesql @query

    END

	

	