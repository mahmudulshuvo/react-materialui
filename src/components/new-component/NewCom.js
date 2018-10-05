import React, { Component } from "react";

class NewCom extends Component {
    render() {
        var $ = require("jquery");
        var flicker = {
            /*unicode : "!\"#$%'()*+,-./0123456789:;?@`aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ{[|\}]~^_",*/
            unicode: "█▓▒░█▓▒░█▓▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░",
            getRandomInt: function(min, max) {
                console.log(min + " " + max);
                console.log("weee");
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },
            randomCharacter: function() {
                return this.unicode[
                    Math.floor(Math.random() * this.unicode.length)
                ];
            },
            replaceAt: function(text, character, index) {
                return (
                    text.substr(0, index) +
                    character +
                    text.substr(index + character.length)
                );
            },
            init: function(el, min, max, delay) {
                var str = $(el)
                        .text()
                        .trim(),
                    bank = [],
                    done = 1,
                    newStr = $(el)
                        .text()
                        .trim();

                for (var i = 0; i < str.length; i++) {
                    bank[i] = this.getRandomInt(min, max);
                }
                flicker.mix(el, str, newStr, done, bank, delay);
            },
            mix: function(el, str, newStr, done, bank, delay) {
                for (var i = 0; i < str.length; i++) {
                    if (bank[i] !== 0) {
                        done = 0;
                        if (str[i] !== " ") {
                            newStr = this.replaceAt(
                                newStr,
                                this.randomCharacter(),
                                i
                            );
                        } else {
                            newStr = this.replaceAt(newStr, " ", i);
                        }
                        bank[i]--;
                    } else {
                        newStr = this.replaceAt(newStr, str[i], i);
                    }
                }

                $(el)
                    .text(newStr)
                    .fadeIn(1000);
                //console.log(bank);
                if (done === 0) {
                    setTimeout(function() {
                        flicker.mix(el, str, newStr, done, bank, delay);
                    }, delay);
                }
            }
        };

        $(function() {
            flicker.init("h1.flickr", 1, 10, 90);
            flicker.init("p.flickr", 1, 10, 90);
        });
        return (
            <div style={{ margin: "40px" }}>
                <h1 class="flickr">Hello</h1>
                <p class="flickr">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                </p>
            </div>
        );
    }
}

export default NewCom;
