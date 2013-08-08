(function($){
	var consonant = '';
	var vowel = '';
	var dcsign = '';
	var dvsign = '';
	var vt = false;
	var ct = false;
	var lo = ''
	$.fn.mmkb = function(){
		return this.each(function(){
			var $this = $(this);
			$this.bind({
				keypress: function(e){
					var charCode = e.charCode;
					if(charCode != 0){
						var shiftedCharCode = asc2mm3(charCode);
						var shiftedChar = String.fromCharCode(shiftedCharCode);
						if(vt){
							if(ct){
								if(shiftedCharCode >= 4155 && shiftedCharCode <= 4158){
									// 4139 - 4149 dependent consotnant signs
									dcsign = shiftedChar;
								} else if(shiftedCharCode >= 4139 && shiftedCharCode <= 4149 && shiftedCharCode != 4145) {
									// 4139 - 4149 dependent vowel signs
									dvsign = shiftedChar;
								} else {
									$($this).append(shiftedChar);
									$($this).val($($this).text());	
									// check for tha way hto again
									// if it is then restart
									// else it is v + c + c -> reset and exit
									if(shiftedCharCode == 4145){
										vt = true;
										vowel = shiftedChar;
									}else{
										vt = false;
									}
									ct = false;
									consonant = '';
									dcsign = '';
									dvsign = '';
									return false;
								}
								vt = false;
								ct = false;
								lo = consonant + dcsign + vowel + dvsign;
								consonant = '';
								dcsign = '';
								dvsign = '';
								vowel = '';
							} else {
								if((shiftedCharCode >= 4096 && shiftedCharCode <= 4128) || 4159){
									ct = true;
									consonant = shiftedChar;
									lo = consonant + dcsign + vowel;
								}
							}
							var text = $($this).text();
							text = text.substring(0, text.length - (lo.length - 1));
							text = text + lo;
							lo = '';
							$($this).text(text);
							$($this).val($($this).text());	
							return false;							
						}
						else if(shiftedCharCode == 4145){
							// though vowel range is (4139 - 4149) 
							// only 4145 (tha wae hto) comes before consonant
							// when typing in myanmar so it is the trigger for logical order
							vowel = shiftedChar;
							vt = true;
							$($this).append(shiftedChar);
							$($this).val($($this).text());
							return false;
						}else {
							$($this).append(shiftedChar);
							$($this).val($($this).text());								
						}
						return false;
					}else{
						return true;   
					}
				},
				keydown: function(e){
					if(e.keyCode==8 && $($this).text().length > 0){
						var newText = ($($this).text()).substring(0,$($this).text().length - 1)
						$($this).text(newText);
					}
				}
			});
		});
	};
	$.fn.unbindMmkb = function(){
		return this.each(function(){
			var $this = $(this);
			$this.unbind('keydown');
			$this.unbind('keypress');
		});
	};
	function asc2mm3(charCode){
		switch(charCode){
			case 32: //! -> do nothing
				break;
			case 33: //! -> da yin gauk
				charCode = 4109;
				break;
			case 34: //" -> do nothing
				break;
			case 35: //# -> ei
				charCode = 4175;
				break;
			case 36: //$ -> da yin hmoke (double headed looking)
				charCode = 4179;
				break;
			case 37: //% -> tha way hto (v-inverted looking)
				charCode = 4180;
				break;
			case 38: //& -> ya kauk
				charCode = 4123;
				break;
			case 39: //' -> do nothing
				break;
			case 40: //( -> do nothing
				break;
			case 41: //) -> do nothing
				break;
			case 43: //+ -> do nothing
				break;
			case 44: //, -> do nothing
				break;
			case 46: //. -> do nothing
				break;
			case 47: /// -> do nothing
				break;
			case 48: //0 -> 0
				charCode = 4160;
				break;
			case 49: //1 -> 1
				charCode = 4161;
				break;
			case 50: //2 -> 2
				charCode = 4162;
				break;
			case 51: //3 -> 3
				charCode = 4163;
				break;
			case 52: //4 -> 4
				charCode = 4164;
				break;
			case 53: //5 -> 5
				charCode = 4165;
				break;
			case 54: //6 -> 6
				charCode = 4166;
				break;
			case 55: //7 -> 7
				charCode = 4167;
				break;
			case 56: //8 -> 8
				charCode = 4168;
				break;
			case 57: //9 -> 9
				charCode = 4169;
				break;
			case 58: //: -> ga nge
				charCode = 4098;
				break;
			case 59: //; -> wit sa pauk
				charCode = 4152;
				break;
			case 60: //< -> poke ka lay
				charCode = 4170;
				break;
			case 61: //= -> do nothing
				break;
			case 62: //> -> poke ma
				charCode = 4171;
				break;
			case 63: //? -> do nothing
				break;
			case 64: //@ -> da yin hmoke (revers looking)
				charCode = 4171;
				break;
			case 65: //A -> ba htet chike
				charCode = 4119;
				break;
			case 66: //B -> ba gone
				charCode = 4122;
				break;
			case 67: //C -> ga gyi
				charCode = 4099;
				break;
			case 68: //D -> lone gyi tin san khat
				charCode = 4142;
				break;
			case 69: //E -> ka gyi (double decker with ta chaung kin below right)
				charCode = 4131;
				break;
			case 70: //F -> wa on top (of other char)
				charCode = 4153;
				break;
			case 71: //G -> wa swe
				charCode = 4157;
				break;
			case 72: //H -> thay thay tin
				charCode = 4150;
				break;
			case 73: //I -> ywaye
				charCode = 4173;
				break;
			case 74: //J -> nauk pyit
				charCode = 4146;
				break;
			case 75: //K -> da dway
				charCode = 4114;
				break;
			case 76: //L -> da wat chike
				charCode = 4115;
				break;
			case 77: //M -> at kha yar 'au' lone kyi tin san khat
				charCode = 4134;
				break;
			case 78: //N -> nya lay
				charCode = 4105;
				break;
			case 79: //O -> tha gyi
				charCode = 4159;
				break;
			case 80: //P -> na gyi
				charCode = 4111;
				break;
			case 81: //Q -> za myin swe
				charCode = 4104;
				break;
			case 82: //R -> first part of "la gaung"
				charCode = 4174;
				break;
			case 83: //S -> ha hto
				charCode = 4158;
				break;
			case 84: //T -> eei (at kha yar)
				charCode = 4132;
				break;
			case 85: //U -> oop (at kha yar)
				charCode = 4133;
				break;
			case 86: //V -> la kyi
				charCode = 4128;
				break;
			case 87: //W -> wa lone
				charCode = 4125;
				break;
			case 88: //X -> hta win bae
				charCode = 4108;
				break;
			case 89: //Y -> da yin kauk hybrid (with ah thak)
				charCode = 4172;
				break;
			case 90: //Z -> za gwel
				charCode = 4103;
				break;
			case 91: //[ -> ha
				charCode = 4127;
				break;
			case 92: //\ -> do nothing
				break;
			case 93: //] -> awww (tha yet yit)
				charCode = 4137;
				break;
			case 94: //^ -> unknown char
				charCode = 4181;
				break;
			case 95: //\ -> do nothing
				break;
			case 96: //^ -> unknown char
				charCode = 4176;
				break;
			case 97: //a -> tha way hto
				charCode = 4145;
				break;
			case 98: //b -> ba gone
				charCode = 4120;
				break;
			case 99: //c -> kha khway
				charCode = 4097;
				break;
			case 100: //d -> lone kyi tin
				charCode = 4141;
				break;
			case 101: //e -> na nge
				charCode = 4116;
				break;
			case 102: //f -> ah thak (as in nga that)
				charCode = 4154;
				break;
			case 103: //g -> mauk cha
				charCode = 4139;
				break;
			case 104: //h -> auk ka myint
				charCode = 4151;
				break;
			case 105: //i -> nga
				charCode = 4100;
				break;
			case 106: //j -> ya yit
				charCode = 4156;
				break;
			case 107: //k -> ta chanung kin
				charCode = 4143;
				break;
			case 108: //l -> hnit chanung kin
				charCode = 4144;
				break;
			case 109: //m -> yay cha
				charCode = 4140;
				break;
			case 110: //n -> nya
				charCode = 4106;
				break;
			case 111: //o -> tha
				charCode = 4126;
				break;
			case 112: //p -> sa lone
				charCode = 4101;
				break;
			case 113: //q -> sa lain
				charCode = 4102;
				break;
			case 114: //r -> ma
				charCode = 4121;
				break;
			case 115: //s -> ya pint
				charCode = 4155;
				break;
			case 116: //t -> aa'
				charCode = 4129;
				break;
			case 117://u -> ka gyi
				charCode = 4096;	
				break;
			case 118://v -> la
				charCode = 4124;	
				break;
			case 119://w -> ta win pu
				charCode = 4112;	
				break;
			case 120://x -> hta sin htoo
				charCode = 4113;	
				break;
			case 121://y -> pa sauk
				charCode = 4117;	
				break;
			case 122://z -> pha wat htoke
				charCode = 4118;	
				break;
			case 123://{ -> a (as in ayar wa ti)
				charCode = 4135;	
				break;
			case 124://| -> do nothing
				break;
			case 125://} -> awww (at kha yar)
				charCode = 4138;	
				break;
			case 126://~ -> unknown char
				charCode = 4177;	
				break;
			case 163://£ -> ta ta lin chake
				charCode = 4107;	
				break;
			default:
		}
		return charCode;
	}    
	
})(jQuery);
