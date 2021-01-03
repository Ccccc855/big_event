$(function () {


    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称产长度必须在1-6个字符'
            }
        }
    })
    initUserInfo()
    // 获取用户信息
    function initUserInfo() {

        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取失败')
                }

                form.val('formUserInfo', res.data)
            }
        });
    }

    // 重置表单的数据
    $('#btnReset').click(function (e) {
        e.preventDefault()
        initUserInfo()
    })

    // 表单数据的提交
    $('.layui-form').submit(function (e) {
        console.log(123);
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),

            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新失败')
                }
                layer.msg('更新成功')
                window.parent.fn()
            }
        });
    })
})