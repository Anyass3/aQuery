class Aq {
    //$=>selector
    //$$=>element
    //$$$=>selectorAll
    constructor({query='',el='',many=false,parent=document}={}){
        if(many)this.many=true;
        if(!Aq.is_html(parent))parent=document;
        if(!!query){
            let queryer;
            if(many) queryer=(q)=>parent.querySelectorAll(q);
            else queryer=(q)=>parent.querySelector(q);
            //if query is list it will query the list items
            if(Aq.is_array(query)){
                this.$$=query.reduce((arr,q)=>{
                    if (many)
                        return [...arr,...queryer(q)];
                    return [...arr,queryer(q)];
                    },[]);this.many=true;
            }else this.$$=queryer(query);
        }else{
            if(Aq.is_html(el))this.$$=el;
            else{
                if(typeof(many)==='number')
                    this.$$=[...Array(many).keys()].reduce(
                        (arr)=>[...arr,document.createElement(el)],
                        []);
                else this.$$=document.createElement(el);
            }
        }this.arr=Array.from(many ? this.$$:[this.$$])
    }
    //methods
    show({cls='',animate='animate-pop-in',delay=600,keep=false}={},func=()=>{}){
        if (!cls) this.rmClass('d-none');
        else this.addClass(cls);
        this.addClass(animate);
        setTimeout(()=>{
                if(!keep)this.rmClass(animate)
            },delay);func(); return this
    }
    hide({cls='',animate="animate-pop-out",delay=600,keep=false}={},func=()=>{}){
        this.addClass(animate);
        setTimeout(()=>{
                if(!cls) this.addClass('d-none');
                else this.rmClass(cls);
                if(!keep)this.rmClass(animate)
            },delay); func(); return this
    }
    toggleDisplay({cls=''}={}){
        return this.run((el)=>{
            if (el.classList.contains(!cls ? 'd-none':cls)){
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
            if (Aq.is_array(props)||!val)
                return e.style.getPropertyValue(prop)
                //e.style.cssText=Aq.obj_text(props,e.style.cssText);
            else{
            const [v,imp]=split(val)
            e.style.setProperty(prop,v,imp ? 'important':'');}
        },props,value);
    }
    rmCss(props){
        return this.run((e)=>{
        e.style.removeProperty(props);
    });}
    attr(props,value){
        return this.$set((e,prop,val)=>{
            if (Aq.is_array(props)||!val)
                return e.getAttribute(prop);
            e.setAttribute(prop, val);
        },props,value); 
    }
    rmAttr(props){
        return this.run((e)=>{
            e.removeAttribute(props);
        });
    }
    appendParent(nodes){
        return this.$run((e,node)=>{
            node.appendChild(e)
        },nodes);
    }
    detachParent(nodes){
        return this.$run((e,node)=>{
                node.removeChild(e)
            },nodes);
    }
    append(nodes){
        return this.$run((e,node)=>{
            console.log(node)
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
        if(!!every)setInterval(this.arr.forEach(func),every)
        else setTimeout(this.arr.forEach(func),delay)
        return this;
    }
    $run(func,arr){
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
        let propsIsStr=(typeof(props)==='string')
        this.run((e)=>{
            if (Aq.is_dict(props))
                for(let key in props) func(e,key,props[key]);
            else if(Aq.is_array(props)||!value){
                if(propsIsStr) props=[props];
                attrs = [...attrs,...props.reduce((arr,key)=>{
                        return [...arr,func(e,key)]
                    },[])];
            }else func(e,props,value)
        });
        if((Aq.is_array(props) || propsIsStr)&&!value)
            return (Aq.is_html(this.$$,false)&&propsIsStr)?attrs[0]:attrs;
        return this
    }
    prop(props,value){
        return this.$set((e,prop,val)=>{
            if (Aq.is_array(props)||!val)
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
        return $old(this.arr[0].parentNode)
    }
    get parents(){
        let arr=Array.from(this.arr.reduce((set,e)=>{
         return  set.add(e.parentNode)
        },new Set()));parent=$many(arr);
    ; return parent
    }
    get child(){//needs improvement
        return $old(this.arr[0].childNodes[0])
    }
    get children(){
        let children=[]
        this.run((e)=>{
            children=[...children,...Array.from(e.childNodes)]
        }); return $many(children);
    }
    get html(){return this.prop('innerHTML')}
    get text(){return this.prop('textContent')}
    get val(){
        let data = Aq.form_data(this.$$)
        let keys = Object.keys(data)
        if(keys.length===1) return data[keys[0]]
        else return data
    }
    set class(className){return this.prop('className',className)}
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
        let els=[];
        this.run((e)=>{
            let el = new Aq({query,parent:e})
            els.push(el.$$);
        })
        return els.length===1 ? $old(els[0]):$many(els)
    }
    $$$(query){
        let els=[];
        this.run((e)=>{
            let _els = new Aq({query,many:true,parent:e})
            els=[...els,..._els.$$];
        })
        return $many(els)
    }
    $new(tag,many){
        let _new = $new(tag,many)
        this.append(_new.$$)
        //console.log(_new)
        return _new
    }
    //end
    //static methods
    static is_array(arr){
        return [].__proto__===arr.__proto__ ||
        NodeList===arr.__proto__.constructor
    }
    static is_html(el,arr=true){
        if(arr){
            if(!Aq.is_array(el))el=[el];
            return el[0].__proto__.__proto__.constructor===HTMLElement
        }else return el.__proto__.__proto__.constructor===HTMLElement
    }
    static is_dict(dict){
        let d={};
        return d.__proto__===dict.__proto__
    }
    static obj_text(props,str=''){
        for(let i in props) str+=`${i}: ${props[i]}; `.trim()
        return str
    }
    static form_data(inputs){
        if(!Aq.is_array(inputs))inputs=[inputs];
        return inputs.reduce((dict,e)=>{
            let data=Aq.form_value(e)
            if(data===null||e.type==="submit")return {...dict}
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
    //end

}
const $new=(tagName,num)=>new Aq({el:tagName,many:num});
const $old=(el)=>new Aq({el})
const $many=(el)=>new Aq({el,many:true})

const $=(query)=>new Aq({query});
const $$$=(query)=>new Aq({query,many:true})