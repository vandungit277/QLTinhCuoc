USE PowerCall
GO
/*
Author: Dungdv24
Desc: 18/11/2018
Desc: Thông tin User có trong những Group nào
*/
ALTER PROCEDURE Call_GetGroupStaffDetail
    @Search INT , --0 Theo tất cả,1 Theo MenuRootID
    @GroupsID VARCHAR(10) ,
    @UserName VARCHAR(30)
AS
    BEGIN
        DECLARE @StaffID VARCHAR(10);
        SELECT  @StaffID = StaffID
        FROM    dbo.Staff(NOLOCK)
        WHERE   UserName = @UserName;

        DECLARE @qr NVARCHAR(200) = ' And 1 = 1 '
        IF @Search = 1 --Người dùng
            BEGIN
                SET @qr = N' AND G.GroupsID = ' + @GroupsID
            END
        DECLARE @query NVARCHAR(MAX) = N'
SELECT  g.GroupsID, '+@StaffID+' AS StaffID,g.GroupsName,ISNULL(GS.Status,0) AS [Status]
FROM    dbo.Groups AS G
		LEFT JOIN (SELECT * FROM dbo.GroupStaffDetail(NOLOCK) WHERE StaffID= '
            + @StaffID + ' )  AS GS ON GS.GroupsID = G.GroupsID
WHERE   G.Status = 1
     ' + @qr
        PRINT @query
        IF EXISTS ( SELECT  1
                    FROM    dbo.Staff(NOLOCK)
                    WHERE   UserName = @UserName )
            BEGIN

                EXEC sp_executesql @query 
            END
        ELSE
            BEGIN
                SELECT  @query = @query + N' And 5 =4';
                EXEC sp_executesql @query 
            END
    END

/*
EXEC dbo.Call_GetGroupStaffDetail @Search = 0, -- int
    @GroupsID = 1 ,-- int
	@UserName ='thanhtt'
*/
