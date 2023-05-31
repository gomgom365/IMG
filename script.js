$(document).ready(function () {


    const kindsOption = {
        전면조명:
        {
            X: { base: 12000, unitPrice: 30000 }, //unitPrice == 폭변화별  길이 가격(100mm단위)
            원단: { base: 14000, unitPrice: 30000 },
            실사: { base: 15000, unitPrice: 40000 },
        },
        전면비조명:
        {
            X: { base: 7000, unitPrice: 20000 },
            원단: { base: 9000, unitPrice: 20000 },
            실사: { base: 9000, unitPrice: 30000 },
        },
        돌출:
        {
            X: { base: [25000, 20000], unitPrice: 50000 }, // [발통, 없음]
            원단: { base: [30000, 25000], unitPrice: 50000 },
            실사: { base: [45000, 40000], unitPrice: 50000 },
        },
    }

    var kinds = $('input[name="kind-radio"]:checked').val();//선택되어진 종류
    var support = $('input[name="support-radio"]:checked').val();//선택되어진 발통
    var screen = $('input[name="screen-radio"]:checked').val();//선택되어진 화면
    var insData = $("#input-data").val();
    var asor
    var bsor
    var getwidth
    var getlength


    $("#input-data, .plusopt,#kinds ,#support, #screen").on('change', function (event) {

        insData = $("#input-data").val();
        asor = sizeSPlit(insData)[0];
        bsor = sizeSPlit(insData)[1];
        getwidth = Math.min(asor, bsor) <= 700 ? 700 : getround(Math.min(asor, bsor), 2); // 700 이하는 700
        getlength = Math.max(asor, bsor) <= 1000 ? 1000 : getround(Math.max(asor, bsor), 2); // 1000 이하는 1000;

        kinds = $('input[name="kind-radio"]:checked').val();//선택되어진 종류
        support = $('input[name="support-radio"]:checked').val();//선택되어진 발통
        screen = $('input[name="screen-radio"]:checked').val();//선택되어진 화면

        $(":checkbox").each(function () {  //":checkbox:checked"
            if ($(this).is(":checked")) {
                $(this).parent().parent().parent().children('input').prop("disabled", false); //선택 그룹 비활성화
            } else {
                $(this).parent().parent().parent().children('input').val("");
                $(this).parent().parent().parent().children('input').prop("disabled", true);
            }
        });

        if (kinds != '돌출') {
            $("#support > input").prop("disabled", true); //설정
            $("#support > span").text("없음"); //설정
            $("#support > input").prop("checked", false); //설정
            support = "";
        } else {
            $("#support > input").prop("disabled", false); //설정
            $("#support > span").text("발통"); //설정

            //설정
            if (support) {

            } else {
                $("#support-radio-1").prop("checked", true);
                support = 0;//설정
            }
        }


        /////////////////////

        if (this.id != "input-data" && this.type != "radio") { // 크기 창 제외(+ 때문)
            $(this).val($(this).val().replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')); //숫자만 입력
        }



        if ($('input[id="supporter"]').is(":checked")) { //까치발
            if (this.id != 'supporter' && $(this).hasClass('form-check-input')) {

            } else {
                var supporterSize
                var supporterCount = $("input[id='supportercount']").val();
                var supporterP

                if ($(this).hasClass('form-control')) {
                    supporterSize = $("#supportersize").val();
                } else {
                    checkTrue(getwidth, "supportersize");
                    supporterSize = $("#supportersize").val();
                }
                if ($(this).hasClass('pay')) {
                    supporterP = $("#supporterpay").val();
                } else {
                    supporterP = getsupporter(supporterSize, supporterCount);//까치발
                }

                $("#supporterpay").val(supporterP);
            }

        }

        if ($('input[id="light_asmb"]').is(":checked")) { // 등조립
            var lightCount = $("#light_asmbcount").val();
            var lightP
            var lprice = kinds == '돌출' ? 10000 : 7000;
            lightP = lightCount * lprice;
            $("#light_asmbpay").val(lightP);
        }


        if ($('input[id="re_angle"]').is(":checked")) { // 각가공
            // $("#re_anglepay").val(30000);
        }

        if ($('input[id="re_paint"]').is(":checked")) { // 도장 5000,8000
            if (this.id != 're_paint' && $(this).hasClass('form-check-input')) {

            } else {
                var palenhth
                var calenhth = getround((asor * 1 + bsor * 1) * 2, 3);
                var paintP
                var paprice = kinds == '돌출' ? 10000 : 7000;
                checkTrue(calenhth, "re_paintlength");
                palenhth = $("#re_paintlength").val();
                paintP = palenhth * paprice / 1000;
                if ($(this).hasClass('pay')) {
                    paintP = $('#re_paintpay').val();
                } else {
                    paintP = paintP < 30000 ? 30000 : paintP
                }

                $("#re_paintpay").val(paintP);
            }
        }

        var supportPsave = $("#supporterpay").val();
        var forcrP = $("#re_forcepay").val();
        var angleP = $("#re_anglepay").val();
        var paintPsave = $("#re_paintpay").val();
        var backP = $("#re_backpay").val();
        var sizecal = calu();
        var total = nono(sizecal) + nono(supportPsave) + nono(lightP) + nono(forcrP) + nono(angleP)
            + nono(paintPsave) + nono(backP);
        total = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 3자리 콤마 표시


        $("#totalpay").val(total);
    });




    function nono(a) {
        if (a == undefined) { return 0; } else { return Number(a); }
    }
    // 종류, 화면 체크박스 값

    // $('#kinds ,#support, #screen, .plusopt').on('change', function (e) {

    //     kinds = $('input[name="kind-radio"]:checked').val();//선택되어진 종류
    //     support = $('input[name="support-radio"]:checked').val();//선택되어진 발통
    //     screen = $('input[name="screen-radio"]:checked').val();//선택되어진 화면

    //     $(":checkbox").each(function () {  //":checkbox:checked"
    //         if ($(this).is(":checked")) {
    //             $(this).parent().parent().parent().children('input').prop("disabled", false); //선택 그룹 비활성화
    //         } else {
    //             $(this).parent().parent().parent().children('input').val("");
    //             $(this).parent().parent().parent().children('input').prop("disabled", true);
    //         }
    //     });

    //     if (kinds != '돌출') {
    //         $("#support > input").prop("disabled", true); //설정
    //         $("#support > span").text("없음"); //설정
    //         $("#support > input").prop("checked", false); //설정
    //         support = "";
    //     } else {
    //         $("#support > input").prop("disabled", false); //설정

    //         //설정
    //         if (support) {

    //         } else {
    //             $("#support-radio-1").prop("checked", true);
    //             support = 0;//설정
    //         }
    //     }
    //     $("#totalpay").val(calu());
    // });



    function calu() {

        var baseP = kinds == '돌출' ? kindsOption[kinds][screen].base[support] : kindsOption[kinds][screen].base;
        var unitP = kindsOption[kinds][screen].unitPrice;
        var Price
        baseP = getwidth >= 1900 ? baseP + 25000 : baseP;


        if (asor && bsor) {
            Price = getround(((baseP + unitP * (getwidth / 1000)) * (getlength / 1000)), 3);
        } else {
            Price = 0;
        }

        return Price;
    }

    //반올림
    function getround(num, position) {
        var mround
        var positional = 10 ** position
        mround = Math.round(num / positional) * positional
        return (mround);
    }
    // 값이 있을때만 값을 입력
    function checkTrue(get, SID) { // 값. 해당칸 아이디

        if (get) {

            $("#" + SID).val(get);
        };

    }

    //입력사이즈 가로,세로 분해
    function sizeSPlit(inp) {
        var maArray = inp.split('+');
        return (maArray);
    }

    //까치발 가격계산 700 :5,000 이후 500원씩 증가
    function getsupporter(size, count) {
        let calu = (size / 100 + 3) * 500 * count;
        var price = getround(calu, 3);

        return price;
    }



});

