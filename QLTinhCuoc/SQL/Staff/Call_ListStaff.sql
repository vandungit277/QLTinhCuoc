USE PowerCall
GO
/*
Author: Dungdv24
Desc: 11/11/2018
Desc: Danh sách nhân viên
*/
ALTER PROCEDURE Call_ListStaff
    @Search INT = 2 ,--0 Search theo tất cả,1 search theo công ty - chi nhánh - phòng ban:2 search theo nhân viên
    @UserName VARCHAR(20) = '' ,
    @ConpanyID VARCHAR(20) = '2' ,
    @BranchID VARCHAR(20) = '1' ,
    @DepartmentID VARCHAR(20) = '1'
AS
    BEGIN

        DECLARE @qrUserName NVARCHAR(200) = ' And 1 = 1 '
		 IF @Search = 3
            BEGIN
                SET @qrUserName = ' And ST.UserName = ''' + @UserName + ''''
            END
        IF @Search = 2
            BEGIN
                SET @qrUserName = ' And ST.UserName = ''' + @UserName + ''''
            END
        IF @Search = 1
            BEGIN
                SET  @qrUserName = ' And C.CompanyID = ''' + @ConpanyID
                        + '''' + ' And B.BranchID  = ''' + @BranchID + ''''
                        + ' And D.DepartmentID  = ''' + @DepartmentID + ''''
                IF ISNULL(@UserName, '') <> ''
                    BEGIN
                        SET @qrUserName = @qrUserName
                            + ' And ST.UserName = ''' + @UserName + ''''
                    END
            END
        DECLARE @query NVARCHAR(MAX) = N'
SELECT  ST.StaffName ,
        ST.UserName ,
        ST.Email ,
		ST.Address ,
		Sex.SexName,
		Role.RoleName,
		ST.Passport,
		CONVERT(varchar(10),ST.Birthdays,103)  AS Birthdays,
		CONVERT(varchar(10),ST.DayIn,103)  AS DayIn,
        C.CompanyName ,
        b.BranchName ,
        D.DepartmentName ,
        IP.IPPhone ,
        S.NameServiceProvider
FROM    ( SELECT    *
          FROM      dbo.Staff(NOLOCK)
        ) AS ST
		JOIN dbo.Sex ON Sex.SexID = ST.SexID
		JOIN dbo.Role ON Role.RoleID = ST.RoleID
        LEFT JOIN dbo.IPPhoneInside(NOLOCK) AS IP ON IP.StaffID = ST.StaffID
        LEFT JOIN dbo.ServiceProvider(NOLOCK) AS S ON S.ServiceProviderID = IP.ServiceProviderID
        JOIN dbo.Department(NOLOCK) AS D ON D.DepartmentID = ST.DepartmentID
        JOIN dbo.Branch(NOLOCK) AS B ON B.BranchID = D.BranchID
        JOIN dbo.Company(NOLOCK) AS C ON C.CompanyID = B.CompanyID
WHERE   ST.Status = 1
     ' + @qrUserName
        PRINT @query
        EXEC sp_executesql @query



    END