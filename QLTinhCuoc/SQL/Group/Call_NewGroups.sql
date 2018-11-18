USE PowerCall
GO
/*
Author:Dungdv24
Date: 18/11/2018
Desc: Thêm mới Groups
*/
ALTER PROCEDURE Call_NewGroups
    @GroupsName NVARCHAR(250) ,
    @Description NVARCHAR(500) ,
    @Status INT,
	@CreateBy NVARCHAR(30)
AS
    BEGIN
        DECLARE @Code INT ,
            @Desc NVARCHAR(200)

        IF EXISTS ( SELECT  1
                    FROM    dbo.Groups(NOLOCK)
                    WHERE   GroupsName = @GroupsName )
            BEGIN
                SET @Code = -1;
                SET @Desc = N'Groups: ' + @GroupsName + N' đã tồn tại';
                GOTO resuilt
            END
        INSERT  INTO dbo.Groups
                ( GroupsName ,
                  Description ,
                  CreateDate ,
                  Status,
				  CreateBy
                )
        VALUES  ( @GroupsName , -- GroupsName - nvarchar(250)
                  @Description , -- Description - nvarchar(500)
                  GETDATE() , -- CreateDate - datetime
                  @Status , -- Status - int
				  @CreateBy
                )
        IF @@ROWCOUNT > 0
            BEGIN
                SET @Code = 1;
                SET @Desc = N'Thêm mới ' + @GroupsName + N' thành công';
            END
        ELSE
            BEGIN
                SET @Code = 0;
                SET @Desc = N'Thêm mới ' + @GroupsName + N' thất bại';
            END

        resuilt:
        BEGIN
            SELECT  @Code AS [Code] ,
                    @Desc AS [Desc]

        END

    END

