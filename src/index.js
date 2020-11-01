
//$=>selector
//$$=>element
//$(*)=>selectorAll
const $ = (query,arg) => {

    const self = {
        
        __init__(query,arg){

            this.Type="abqueryObject";
            if($.is_proto(query)) return query;
            if($.typeof(query,'function'))return $.ready(query)
            this.num=1;this.__query__=document;
            
            if(!!arg&&$.typeof(arg,'number'))this.num=arg;
            else if(!!arg&&$.is_html(arg))this.__query__=arg;
            
            this.query=query||document;
            
            this.new=($.typeof(query,'string')&&$.is_new(query))
            
            if(!this.new&&!$.is_html(this.query)){
                let queryer,[query, all] = $.clean(this.query,true)
                if(all){ queryer=(q)=>this.__query__.querySelectorAll(q);this.many=true;}
                else queryer=(q)=>this.__query__.querySelector(q);
                //if query is list it will query the list items
                if($.is_array(query)){
                    this.$$=query.reduce((arr,q)=>{
                        if (all)
                            return [...arr,...queryer(q)];
                        return [...arr,queryer(q)];
                        },[]);this.many=true;
                }else this.$$=queryer(query);
            }else{
                if(this.num>1||$.is_array(this.query)) this.many=true;
                if($.is_html(this.query))this.$$=this.query;
                else{
                    this.$$=[...Array(this.num).keys()].reduce(
                        (arr)=>[...arr,document.createElement(this.query.slice(1,-1))],
                        []);
                    if(this.num===1)this.$$=this.$$[0];
                }
            }
            this.arr=Array.from(this.many ? this.$$:[this.$$])
            this.__get__(this.arr)
            return this.__html_proto__(['id'])
        },
        __get__(props,value){
            if ($.is_array($.clean(props))||$.is_array(props)){
                props=Object.assign($.is_array(props)?props:$.clean(props));
                for(let key in props)$.__get__(this,key,()=>$(props[key]))
            }else{
                if($.typeof(props,'string')&&!!value)props={[props]:value}
                for (let prop in props) $.__set__(this,prop,props[prop])
            }return this;
        },
        __set__(props,value){
            if($.typeof(props,'string')&&!!value)props={[props]:value};
            for (let prop in props) $.__set__(this,prop,props[prop]);
            return this;
        },
        __define_prop__(props,value={_get:()=>this.prop(prop),_set:(v)=>this.prop(prop,v)}){
            if($.typeof(props,'string')&&!!value)props={[props]:value}
            for (let prop in props)$.__define_prop__(this,prop,props[prop]);
            return this;
        },
        __html_proto__(arr=[]){
            return this.__define_prop__([...Object.keys(HTMLElement.prototype),...arr]
            .filter((i)=>!/^on/.test(i))
            .reduce((ob,i)=>{
                return ['click','style','focus','blur'].includes(i)?{...ob}:
                {...ob,[i]:{_get:()=>this.prop(i),_set:(v)=>this.prop(i,v)}}
            },{}))
        },
        //methods
        show({cls='',animate='abquery-show',delay=600,keep=false}={},func=()=>{}){
            if (!cls) this.rmClass('abquery-d-none, d-none').rmCss('display');
            else this.addClass(cls);
            this.addClass(animate);
            setTimeout(()=>{
                    if(!keep)this.rmClass(animate)
                },delay);func(); return this
        },
        hide({cls='',animate="abquery-hide",delay=600,keep=false}={},func=()=>{}){
            this.addClass(animate);
            setTimeout(()=>{
                    if(!cls) this.addClass('abquery-d-none');
                    else this.rmClass(cls);
                    if(!keep)this.rmClass(animate)
                },delay); func(); return this
        },
        toggleDisplay({cls=''}={}){
            return this.run((el)=>{
                if ($(el).hasClass(!cls ? ['abquery-d-none','d-none']:cls,{someClass:true})){
                    this.show({cls})
                }else{
                    this.hide({cls})
                }
            });
        },
        addClass(cls){
            return this.$run((e,c)=>{
                if(!!c.trim())
                e.classList.add(c);
            },cls)
        },
        hasClass(cls,{someClass=false,someEl=false}={}){
            const check =(e,cl)=>e.classList.contains(cl)
            return this.$runBool(check,cls,{someArr:someClass,someEl})
        },
        rmClass(cls){
            return this.$run((e,c)=>{
                if(!!c.trim())
                e.classList.remove(c);
            },cls);
        },
        toggleClass(cls){
            return this.$run((e,c)=>{
                e.classList.toggle(c);
            },cls); 
        },
        css(props,value,imp=false){
            const split=(v,s='!')=> [v.split(s)[0].trim(),imp?imp:!!v.split(s)[1]]
            return this.$set((e,prop,val)=>{
                if ($.is_array($.clean(props))||val===undefined)
                    return e.style.getPropertyValue(prop)
                    //e.style.cssText=$.obj_text(props,e.style.cssText);
                else{
                const [v,imp]=$.typeof(val,'number')?[val,false]:split(val)
                e.style.setProperty(prop,v,imp ? 'important':'');}
            },props,value);
        },
        rmCss(props){
            return this.$run((e,prop)=>{
            e.style.removeProperty(prop);
        },props)},
        attr(props,value){
            return this.$set((e,prop,val)=>{
                if ($.is_array($.clean(props))||val===undefined)
                    return e.getAttribute(prop);
                e.setAttribute(prop, val);
            },props,value); 
        },
        rmAttr(props){
            return this.$run((e,prop)=>{
                e.removeAttribute(prop);
            },props)
        },
        appendParent(nodes){
            return this.$run((e,node)=>{
                $.e(node).appendChild(e)
            },nodes);
        },
        detachParent(){
            return this.run((e)=>{
                    e.parentNode.removeChild(e)
                });
        },
        append(nodes){
            return this.$run((e,node)=>{
                e.appendChild($.e(node));
            },nodes);
        },
        detach(nodes){
            return this.$run((e,node)=>{
                e.removeChild($.e(node))
            },nodes)
        },
        index(e){
            const index = this.arr.indexOf($.e(e))
            return index>=0?index:Error(console.error("cannot find index of arg"))
        },
        // useful methods
        run(func,{delay=0,every=0}={}){
            const arr = this.arr
            if(!!every)setInterval(()=>arr.forEach(func),every)
            else if(!!delay) setTimeout(()=>arr.forEach(func),delay)
            else arr.forEach(func)
            return this;
        },
        $run(func,arr){
            arr=$.clean(arr)
            if (!$.is_array(arr)) arr=[arr]
            arr.forEach(i=>this.run(e=>func(e,i))); 
            return this
        },
        $runBool(func,arr,{someArr=false,someEl=false}={}){
            // returns a boolean
            if (!$.is_array(arr)) arr=[arr]
            const to_run=(i)=>someEl?this.arr.some(e=>func(e,i)):this.arr.every(e=>func(e,i));
            return someArr?arr.some(to_run):arr.every(to_run)
        },
        $set(func,props,value){
            let attrs=[];
            props = $.clean(props)
            let propsIsStr=($.typeof(props,'string'))
            this.run((e)=>{
                if ($.is_dict(props))
                    for(let key in props) func(e,key,props[key]);
                else if($.is_array(props)||value===undefined){
                    if(propsIsStr) props=[props];
                    attrs = [...attrs,...props.reduce((arr,key)=>{
                            return [...arr,func(e,key)]
                        },[])];
                }else func(e,props,value)
            });
            if(($.is_array(props) || propsIsStr)&&value===undefined)
                return (this.arr.length===1&&propsIsStr)?attrs[0]:attrs;
            return this
        },
        prop(props,value){
            return this.$set((e,prop,val)=>{
                if ($.is_array($.clean(props))||val===undefined)
                    return e[prop];
                try{e[prop]=val}
                catch(err){console.error(err)}
            },props,value);
        },
        //end
        //property getters & setters
        get class(){
            return this.prop('className')
        },
        get parent(){
            //returns first child parent
            return $(this.arr[0].parentNode)
        },
        get parents(){
            let arr=Array.from(this.arr.reduce((set,e)=>{
            return  set.add(e.parentNode)
            },new Set()));
        ; return $(arr)
        },
        get child(){//needs improvement
            return $(this.arr[0].firstElementChild)
        },
        get children(){
            let children=
            this.arr.reduce((arr,e)=>{
                return [...arr,...Array.from(e.children)]
            },[]); return $(children);
        },
        get len(){return this.arr.length},
        get html(){return this.prop('innerHTML')},
        get text(){return this.prop('textContent')},
        get val(){
            let data = $.form_data(this.$$)
            let keys = Object.keys(data)
            if(keys.length===1) return data[keys[0]];
            else return data;
        },
        set class(className){this.prop('className',className)},
        set html(html){this.prop('innerHTML',html)},
        set text(text){this.prop('textContent',text)},
        set val(value){
            this.run((e)=>{
                let prop=$.form_value(e,true)
                e[prop]=value
            })
        },
        //end
        //some-events
        on(events,func){
            return this.$run((e,event)=>{
                $.on(event,func,e);
            },events);
        },
        hover(func){
            return this.on('mouseover,mouseout',func)
        },
        click(func){
            return this.on('click',func)
        },
        debounce(ev,fn,delay){
            if($.typeof(ev,'function')&&(fn===undefined||$.typeof(fn,'number')))
            return this.run($.debounce(ev,fn));
            return this.on(ev,$.debounce(fn,delay))
        },
        throttle(ev,fn,delay){
            if($.typeof(ev,'function')&&(fn===undefined||$.typeof(fn,'number')))
            return this.run($.throttle(ev,fn));
            return this.on(ev,$.throttle(fn,delay))
        },
        //end
        //new init 
        $(query,num_for_new){
            if($.is_new(query))
                return this.$new(query,num_for_new);
    
            const els=Array.from(this.arr.reduce((set,e)=>{
                return new Set([...set,...$(query,e).arr])
            },new Set)).filter(e=>e!==null);
            if(!els)throw Error(`query:${query} is not in parent/s`)
            return els.length===1 ? $(els[0]):$(els)
        },
        $new(tag,num){
            let _new = $(tag,num)
            this.append(_new.$$)
            return _new
        },
        //end
    }
    
    return self.__init__(query,arg);
            
    
};
    
    
    //static methods
    $.is_proto=(e)=>!!e&&e.Type===$().Type
    $.is_array=(arr)=>{
        if(!arr)return false
        return [].__proto__===arr.__proto__ ||
        NodeList===arr.__proto__.constructor
    }
    $.is_html=(el,arr=true)=>{
        if(!el)return false
        const is_html=(e)=>e.__proto__.constructor.toString().includes('HTML')
        if(arr){
            if(!$.is_array(el))el=[el];
            return is_html(el[0])
        }else return is_html(el)
    }
    $.is_new=(query)=>$.typeof(query,'string')&&/^<[a-z]+>$/.test(query)
    $.typeof=(arg,type)=>typeof arg===type
    $.is_dict=(dict)=>{
        if(!dict)return false
        const d={};
        return d.__proto__===dict.__proto__
    }
    $.__get__=(obj,prop,func)=>{
        const fn =!$.typeof(func,'function')?()=>func:func;
        return Object.defineProperty(obj,prop,{get: fn})
    } 
    $.__set__=(obj,prop,func)=>{
        return Object.defineProperty(obj,prop,{set: func})
    }
    $.__define_prop__=(obj,prop,{_get,_set})=>{
        const fn =!$.typeof(_get,'function')?()=>_get:_get;
        return Object.defineProperty(obj,prop,{get: fn,set: _set})
    }
    $.obj_text=(props,str='')=>{
        for(let i in props) str+=`${i}: ${props[i]}; `.trim()
        return str
    }
    $.clean=(q,m=false)=>{
        if($.is_array(q))q=q.toString();
        else if(!$.typeof(q,"string"))return q;
        let all=false;if(q[0]==="*"){q=q.slice(1);all=true};
        q=q.split(',').reduce((arr,q)=>{return[...arr,q.trim()]},[]);
        q=q.length===1?q[0]:q
        return m?[q,all]:q
    }
    $.e=(e)=>$.is_proto(e)?e.$$:e
    $.form_data=(inputs)=>{
        if(!$.is_array(inputs))inputs=[inputs];
        return Array.from(inputs).reduce((dict,e)=>{
            let data=$.form_value(e)
            if(data===null||e.type==="submit")return dict;
            return {...dict,[e.name||e.id]:data}
        },{})
    }
    $.form_value=(e,key=false)=>{
        if(e.tagName==="INPUT"||e.tagName==="TEXTAREA"){
            if (['radio','checkbox'].includes(e.type))
            return key? 'checked':e.checked;
            else if(e.type==="file"){
                if(e.multiple===true) return key? 'files': e.files;
                return key? 'files[0]': e.files[0]
            }else return key? 'value': e.value
        }else if(e.tagName==="SELECT")
        return key? 'select.option.selected':Array.from(e.options)
        .filter((option) => option.selected)
        .map((option) => option.value);
        else return null
    }
    $.debounce=(fn,delay=2000)=>{
        let timeout;
        return (...args)=>{
          if (!!timeout)clearTimeout(timeout);
          timeout=setTimeout(()=>{
            fn(...args)
          },delay)
        }
    }
    $.throttle=(fn,delay=2000)=>{
        let record=0;
        return (...args)=>{
          const now = new Date().getTime();
          if(now-record<delay)return;
          record=now;
          return fn(...args);
        }
    }
    $.styleElementId = "abquery-stylesheet";
    $.css_prefix=(rule)=>{
        return ['','-webkit-','-moz-'].reduce((str,pre)=>{
            return str+=`${pre}${rule.trim()};`
        },'')
    }
    $.init_style_defaults=()=>{
        if($('abquery-init_style_defaults').$$) return;
        let show = `${$.css_prefix('animation: abquery-keyframe-show .6s cubic-bezier(0, 0.9, 0.3, 1.2) forwards')}
        opacity: 0;${$.css_prefix("transform: translateY(-4rem) scale(.8)")}`
        let hidekf = `0% {${$.css_prefix('transform: scale(1)')}opacity: 1;}
        20%{${$.css_prefix('transform: scale(.9)')}} 100% {${$.css_prefix('transform: none')}opacity: 0;}`
        $.add_keyframes('abquery-keyframe-show',`100%{opacity: 1;${$.css_prefix('transform: none')}}`)
        $.add_style(".abquery-show",show); $.add_keyframes("abquery-keyframe-hide",hidekf)
        $.add_style(".abquery-hide",`${$.css_prefix("animation: abquery-keyframe-hide .6s ease-out")}`)
        return $.add_style(".abquery-d-none","display:none !important").attr('abquery-init_style_defaults',true)
    }
    $.gen_frames=(name,frames)=>{
        return `
        @keyframes ${name} {${frames}}
        @-webkit-keyframes ${name} {${frames}}
        `
    }
    $.get_styles=(id=$.styleElementId)=>{
        let $styles=$(`#${id}`);
        if(!$styles.$$)$styles=$.new('style').attr({type:"text/css",id:`${id}`});
        return $styles
    }
    $.add_keyframes=(name,frames,id=$.styleElementId)=>{
        const $styles=$.get_styles(id)
        $styles.appendParent(document.head).html+=$.gen_frames(name,frames)
        return $styles
    }
    $.add_style=(selector,rules,id)=>{
        const $styles=$.get_styles(id)
        $styles.appendParent(document.head).html+=`${selector} {${rules}}`
        return $styles
    }
    $.on=(event,func,el=document)=>el.addEventListener(event,func)
    $.ready=(func)=>{
        $.on("DOMContentLoaded",func)
    }
    $.new=(tagName,num)=>$(`<${tagName}>`,num)
    $.id =(q)=>$(q.toString().split(',').reduce((ar,i)=>[...ar,'#'+i.trim()],[]).toString())
    $.cls =(q)=>$('*'+q.toString().split(',').reduce((ar,i)=>[...ar,'.'+i.trim()],[]).toString())
    $.attrs =(q)=>$('*'+q.toString().split(',').reduce((ar,i)=>[...ar,'['+i.trim()+']'],[]).toString())

    
    module.exports = $