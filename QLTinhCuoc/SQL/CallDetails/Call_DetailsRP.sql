USE PowerCall
GO
/*
Author: Dungdv24
Desc: 11/11/2018
Desc: Báo cáo chi tiết cuộc gọi
*/
ALTER PROCEDURE Call_DetailsRP
    @Search INT, --1 Theo người dùng,2 công ty,3 chi nhánh,4 Phòng ban
	@UserName VARCHAR(30),
	@FromDate VARCHAR(10),
	@ToDate VARCHAR(10),
	@CompanyID VARCHAR(10),
	@BranchID VARCHAR(10),
	@DepartmentID VARCHAR(10)
AS
    BEGIN

        DECLARE @qr NVARCHAR(200) = ' And 1 = 1 '
		 IF @Search = 1 --Người dùng
            BEGIN
               IF ISNULL(@UserName,'')=''
				BEGIN
				 SET @qr = N' And 1 = 1 ';
				END
				ELSE
				BEGIN
                SET @qr = N' AND S.UserName = '''+@UserName+'''';
				END
            END
        IF @Search = 2 --Công ty
            BEGIN
                SET @qr = ' AND C.CompanyID = '+@CompanyID;
				IF ISNULL(@UserName,'')<>''
				BEGIN
				 SET @qr = @qr+N' AND S.UserName = '''+@UserName+'''';
				END
            END
        IF @Search = 3 --Chi nhánh
            BEGIN
                SET @qr = ' AND C.CompanyID = '+@CompanyID + 'AND B.BranchID = '+@BranchID;
				IF ISNULL(@UserName,'')<>''
				BEGIN
				 SET @qr = @qr+N' AND S.UserName = '''+@UserName+'''';
				END
            END
		IF @Search = 4
            BEGIN
                SET @qr = ' AND C.CompanyID = '+@CompanyID + 'AND B.BranchID = '+@BranchID +'AND D.DepartmentID = '+@DepartmentID
				IF ISNULL(@UserName,'')<>''
				BEGIN
				 SET @qr = @qr+N' AND S.UserName = '''+@UserName+'''';
				END
            END
        DECLARE @query NVARCHAR(MAX) = N'SELECT  S.UserName ,
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
		WHERE CONVERT(DATE,CD.TimeStart) BETWEEN '''+@FromDate+''' AND '''+@ToDate+'''
     ' + @qr +N' ORDER BY   CD.Total '
        PRINT @query
        EXEC sp_executesql @query

    END

	

	