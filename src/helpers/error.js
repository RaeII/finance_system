import colors from "colors/safe.js";

const error = (res, e) => {
    
    const message = {error:''}

    if(typeof e === "string") message.error = e
        else if(e instanceof Error) message.error = e.message

    console.log(colors.bold(`❌ ERROR ❌\n${colors.red(message.error)}\n${e.stack}\n❌ ERROR ❌`))

    return res.status(400).json({
        status:'fail',
        message:message.error
    });
}

const errorDiscordBot = (e) => {
    const message = {error:''}

    if(typeof e === "string") message.error = e
        else if(e instanceof Error) message.error = e.message

    console.log(colors.bold(`❌ ERROR ❌\n${colors.red(message.error)}\n${e.stack}\n❌ ERROR ❌`))

    throw new Error('Ocorreu um erro inesperado. Já estamos verificando 🙂')
}

export {error,errorDiscordBot}