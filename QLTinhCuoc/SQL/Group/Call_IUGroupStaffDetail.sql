USE PowerCall
GO
/*
Author: Dungdv24
Desc: 11/11/2018
Desc: Danh sách Groups mà User Tham gia
*/
ALTER PROCEDURE Call_IUGroupStaffDetail
    @GroupsID INT ,
    @Status INT ,
    @UpdateBy VARCHAR(30) ,
    @StaffID INT ,
    @Description NVARCHAR(500)
AS
    BEGIN

        IF ISNULL(@Description, '') = ''
            BEGIN
                IF @Status = 0
                    BEGIN
                        SET @Description = N'OFF'
                    END
                ELSE
                    BEGIN
                        SET @Description = N'Kích hoạt'
                    END
            END
        IF NOT EXISTS ( SELECT  *
                        FROM    dbo.Staff(NOLOCK)
                        WHERE   StaffID = @StaffID )
            BEGIN
                SELECT  -1 AS [Code] ,
                        N'User không tồn tại trên hệ thống' AS [Desc];
                RETURN;
            END
		

        IF EXISTS ( SELECT  1
                    FROM    dbo.GroupStaffDetail(NOLOCK)
                    WHERE   StaffID = @StaffID
                            AND GroupsID = @GroupsID )
            BEGIN
                UPDATE  dbo.GroupStaffDetail
                SET     Status = @Status ,
                        Description = @Description ,
                        UpdateBy = @UpdateBy
                WHERE   StaffID = @StaffID
                        AND GroupsID = @GroupsID
                        
            END
        ELSE
            BEGIN
                INSERT  INTO dbo.GroupStaffDetail
                        ( StaffID ,
                          GroupsID ,
                          Status ,
                          CreateDate ,
                          Description ,
                          UpdateBy
                        )
                VALUES  ( @StaffID , -- StaffID - int
                          @GroupsID , -- GroupsID - int
                          @Status , -- Status - int
                          GETDATE() , -- CreateDate - datetime
                          @Description ,  -- Description - nvarchar(500)
                          @UpdateBy
                        )
            END
        IF @@ROWCOUNT > 0
            BEGIN
                SELECT  1 AS [Code] ,
                        N'Cập nhật thành công' AS [Desc];
            END
        ELSE
            BEGIN
                SELECT  0 AS [Code] ,
                        N'Cập nhật thất bại' AS [Desc];
            END


    END



	--SELECT * FROM dbo.GroupStaffDetail