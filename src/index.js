class Aq {
    //$=>selector
    //$$=>element
    //$(*)=>selectorAll
    constructor({query='',parent=document,el='',num=1}={}){
        this.query=query;
        if(!Aq.is_html(parent))parent=document;
        if(!!query){
            let queryer,[query,all] = Aq.clean(this.query,true)
            if(all){ queryer=(q)=>parent.querySelectorAll(q);this.many=true;}
            else queryer=(q)=>parent.querySelector(q);
            //if query is list it will query the list items
            if(Aq.is_array(query)){
                this.$$=query.reduce((arr,q)=>{
                    if (all)
                        return [...arr,...queryer(q)];
                    return [...arr,queryer(q)];
                    },[]);this.many=true;
            }else this.$$=queryer(query);
        }else{
            if(num>1||Aq.is_array(el)) this.many=true;
            if(Aq.is_html(el))this.$$=el;
            else{
                if(num>1)
                    this.$$=[...Array(num).keys()].reduce(
                        (arr)=>[...arr,document.createElement(el)],
                        []);
                else this.$$=document.createElement(el);
            }
        }this.arr=Array.from(this.many ? this.$$:[this.$$])
    }
    //methods
    show({cls='',animate='abquery-show',delay=600,keep=false}={},func=()=>{}){
        if (!cls) this.rmClass('abquery-d-none, d-none').rmCss('display');
        else this.addClass(cls);
        this.addClass(animate);
        setTimeout(()=>{
                if(!keep)this.rmClass(animate)
            },delay);func(); return this
    }
    hide({cls='',animate="abquery-hide",delay=600,keep=false}={},func=()=>{}){
        this.addClass(animate);
        setTimeout(()=>{
                if(!cls) this.addClass('abquery-d-none');
                else this.rmClass(cls);
                if(!keep)this.rmClass(animate)
            },delay); func(); return this
    }
    toggleDisplay({cls=''}={}){
        return this.run((el)=>{
            if ($el(el).hasClass(!cls ? ['abquery-d-none','d-none']:cls,{someClass:true})){
                this.show({cls})
            }else{
                this.hide({cls})
            }
        });
    }
    addClass(cls){
        return this.$run((e,c)=>{
            if(!!c.trim())
            e.classList.add(c);
        },cls)
    }
    hasClass(cls,{someClass=false,someEl=false}={}){
        const check =(e,cl)=>e.classList.contains(cl)
        return this.$runBool(check,cls,{someArr:someClass,someEl})
    }
    rmClass(cls){
        return this.$run((e,c)=>{
            if(!!c.trim())
            e.classList.remove(c);
        },cls);
    }
    toggleClass(cls){
        return this.$run((e,c)=>{
            e.classList.toggle(c);
        },cls); 
    }
    
    on(events,func){
        return this.$run((e,event)=>{
            e.addEventListener(event,func);
        },events);
    }
    css(props,value,imp=false){
        const split=(v,s='!')=> [v.split(s)[0].trim(),imp?imp:!!v.split(s)[1]]
        return this.$set((e,prop,val)=>{
            if (Aq.is_array(Aq.clean(props))||val===undefined)
                return e.style.getPropertyValue(prop)
                //e.style.cssText=Aq.obj_text(props,e.style.cssText);
            else{
            const [v,imp]=typeof(val)==='number'?[val,false]:split(val)
            e.style.setProperty(prop,v,imp ? 'important':'');}
        },props,value);
    }
    rmCss(props){
        return this.$run((e,prop)=>{
        e.style.removeProperty(prop);
    },props)}
    attr(props,value){
        return this.$set((e,prop,val)=>{
            if (Aq.is_array(Aq.clean(props))||val===undefined)
                return e.getAttribute(prop);
            e.setAttribute(prop, val);
        },props,value); 
    }
    rmAttr(props){
        return this.$run((e,prop)=>{
            e.removeAttribute(prop);
        },props)
    }
    appendParent(nodes){
        return this.$run((e,node)=>{
            node.appendChild(e)
        },nodes);
    }
    detachParent(){
        return this.run((e)=>{
                e.parentNode.removeChild(e)
            });
    }
    append(nodes){
        return this.$run((e,node)=>{
            e.appendChild(node);
        },nodes);
    }
    detach(nodes){
        return this.$run((e,node)=>{
            e.removeChild(node)
        },nodes)
    }
    // useful methods
    run(func,{delay=0,every=0}={}){
        const arr = this.arr
        if(!!every)setInterval(()=>arr.forEach(func),every)
        else if(!!delay) setTimeout(()=>arr.forEach(func),delay)
        else arr.forEach(func)
        return this;
    }
    $run(func,arr){
        arr=Aq.clean(arr)
        if (!Aq.is_array(arr)) arr=[arr]
        arr.forEach(i=>this.run(e=>func(e,i))); 
        return this
    }
    $runBool(func,arr,{someArr=false,someEl=false}={}){
        // returns a boolean
        if (!Aq.is_array(arr)) arr=[arr]
        const to_run=(i)=>someEl?this.arr.some(e=>func(e,i)):this.arr.every(e=>func(e,i));
        return someArr?arr.some(to_run):arr.every(to_run)
    }
    $set(func,props,value){
        let attrs=[];
        props = Aq.clean(props)
        let propsIsStr=(typeof(props)==='string')
        this.run((e)=>{
            if (Aq.is_dict(props))
                for(let key in props) func(e,key,props[key]);
            else if(Aq.is_array(props)||value===undefined){
                if(propsIsStr) props=[props];
                attrs = [...attrs,...props.reduce((arr,key)=>{
                        return [...arr,func(e,key)]
                    },[])];
            }else func(e,props,value)
        });
        if((Aq.is_array(props) || propsIsStr)&&value===undefined)
            return (this.arr.length===1&&propsIsStr)?attrs[0]:attrs;
        return this
    }
    prop(props,value){
        return this.$set((e,prop,val)=>{
            if (Aq.is_array(Aq.clean(props))||val===undefined)
                return e[prop];
            try{e[prop]=val}
            catch(err){console.error(err)}
        },props,value);
    }
    //end
    //property getters & setters
    get class(){
        return this.prop('className')
    }
    get parent(){
        //returns first child parent
        return $el(this.arr[0].parentNode)
    }
    get parents(){
        let arr=Array.from(this.arr.reduce((set,e)=>{
         return  set.add(e.parentNode)
        },new Set()));
    ; return $el(arr)
    }
    get child(){//needs improvement
        return $el(this.arr[0].childNodes[0])
    }
    get children(){
        let children=[]
        this.run((e)=>{
            children=[...children,...Array.from(e.childNodes)]
        }); return $el(children);
    }
    get html(){return this.prop('innerHTML')}
    get text(){return this.prop('textContent')}
    get val(){
        let data = Aq.form_data(this.$$)
        let keys = Object.keys(data)
        if(keys.length===1) return data[keys[0]]
        else return data
    }
    set class(className){this.prop('className',className)}
    set html(html){this.prop('innerHTML',html)}
    set text(text){this.prop('textContent',text)}
    set val(value){
        this.run((e)=>{
            let prop=Aq.form_value(e,true)
            e[prop]=value
        })
    }
    //end
    //new init
    $(query){
        const els=this.arr.reduce((arr,e)=>{
            return [...arr,...$(query,e).arr]
        },[])
        return els.length===1 ? $el(els[0]):$el(els)
    }
    $new(tag,num){
        let _new = $new(tag,num)
        this.append(_new.$$)
        return _new
    }
    //end
    //static methods
    static is_array(arr){
        return [].__proto__===arr.__proto__ ||
        NodeList===arr.__proto__.constructor
    }
    static is_html(el,arr=true){
        const is_html=(e)=>e.__proto__.constructor.toString().includes('HTML')
        if(arr){
            if(!Aq.is_array(el))el=[el];
            return is_html(el[0])
        }else return is_html(el)
    }
    static is_dict(dict){
        let d={};
        return d.__proto__===dict.__proto__
    }
    static obj_text(props,str=''){
        for(let i in props) str+=`${i}: ${props[i]}; `.trim()
        return str
    }
    static clean(q,m=false){
        if(typeof(q)!=="string")return q;
        let all=false;if(q[0]==="*"){q=q.slice(1);all=true};
        q=q.split(',').reduce((arr,q)=>{return[...arr,q.trim()]},[]);
        q=q.length===1?q[0]:q
        return m?[q,all]:q
    }
    static form_data(inputs){
        if(!Aq.is_array(inputs))inputs=[inputs];
        return inputs.reduce((dict,e)=>{
            let data=Aq.form_value(e)
            if(data===null||e.type==="submit")return dict;
            return {...dict,[e.name||e.id]:data}
        },{})
        
    }
    static form_value(e,key=false){
        if(e.tagName==="INPUT"||e.tagName==="TEXTAREA"){
            if (['radio','checkbox'].includes(e.type))
            return key? 'checked':e.checked;
            else if(e.type==="file"){
                if(e.multiple===true) return key? 'files': e.files;
                return key? 'files[0]': e.files[0]
            }else return key? 'value': e.value
        }
        else if(e.tagName==="SELECT")
         return key? 'select.option.selected':Array.from(e.options)
        .filter((option) => option.selected)
        .map((option) => option.value);
        else return null
    }
    static styleElementId = "abquery-stylesheet";
    static css_prefix(rule){
        return ['','-webkit-','-moz-'].reduce((str,pre)=>{
            return str+=`${pre}${rule.trim()};`
        },'')
    }
    static init_style_defaults(){
        if($('abquery-init_style_defaults').$$) return;
        let show = `${Aq.css_prefix('animation: abquery-keyframe-show .6s cubic-bezier(0, 0.9, 0.3, 1.2) forwards')}
        opacity: 0;${Aq.css_prefix("transform: translateY(-4rem) scale(.8)")}`
        let hidekf = `0% {${Aq.css_prefix('transform: scale(1)')}opacity: 1;}
        20%{${Aq.css_prefix('transform: scale(.9)')}} 100% {${Aq.css_prefix('transform: none')}opacity: 0;}`
        Aq.add_keyframes('abquery-keyframe-show',`100%{opacity: 1;${Aq.css_prefix('transform: none')}}`)
        Aq.add_style(".abquery-show",show); Aq.add_keyframes("abquery-keyframe-hide",hidekf)
        Aq.add_style(".abquery-hide",`${Aq.css_prefix("animation: abquery-keyframe-hide .6s ease-out")}`)
        return Aq.add_style(".abquery-d-none","display:none !important").attr('abquery-init_style_defaults',true)
    }
    static gen_frames(name,frames){
        return `
        @keyframes ${name} {${frames}}
        @-webkit-keyframes ${name} {${frames}}
        `
    }
    static get_styles(id=Aq.styleElementId){
        let aqstyles=$(`#${id}`);
        if(!aqstyles.$$)aqstyles=$new('style').attr({type:"text/css",id:`${id}`});
        return aqstyles
    }
    static add_keyframes(name,frames,id=Aq.styleElementId){
        const aqstyles=Aq.get_styles(id)
        aqstyles.appendParent(document.head).html+=Aq.gen_frames(name,frames)
        return aqstyles
    }
    static add_style(selector,rules,id){
        const aqstyles=Aq.get_styles(id)
        aqstyles.appendParent(document.head).html+=`${selector} {${rules}}`
        return aqstyles
    }
    //end

}
const $new=(tagName,num)=>new Aq({el:tagName,num});

const $el=(el)=>new Aq({el})

const $=(query,element_to_query)=>new Aq({query,parent:element_to_query});

module.exports = {Aq, $, $new, $el}