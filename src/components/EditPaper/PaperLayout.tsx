import {Page,Text,View,StyleSheet, Document} from '@react-pdf/renderer'
import { paperType } from '../../functions/functions';

//Style for paper PDF.
const styles = StyleSheet.create({
  page: {
      padding: 36, // 0.5 inch padding
      fontSize: 12,
      fontFamily: 'Times-Roman',
      
  },
  title: {
      fontSize: 18,
      textAlign: 'center',
      marginBottom: 10,
      fontFamily:'Times-Roman',
      fontWeight:'heavy'
  },
  hourMarksContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:5
  },
  subject: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 20,
      fontWeight: 700,
  },
  line:{
    width:'100%',
    borderBottom:1,
    marginVertical:10
  },
  heading: {
      fontSize: 16,
      textAlign: 'center',
  },
  questionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical:10
  },
  questionText: {
      flex: 1,
      paddingRight:2
  },
  marks: {
      fontWeight: 'bold',
  },
});

//Layout for paper generation.
function PaperLayout({paper}:{paper:paperType}) {
  return (
    <Document>
    <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{paper.title}</Text>
        <Text style={styles.subject}>{paper.subject}</Text>
        <View style={styles.hourMarksContainer}>
          <Text>Marks:{paper.marks}</Text>
          <Text>Duration:{paper.duration} Hours</Text>
        </View>
        <View style={styles.line}></View>
        <Text>
          {paper.instructions}
          </Text>
        <View style={styles.line}></View>
        {paper.body.map((item, index) => {
            if (item.type === 'heading') {
                return <Text key={index} style={styles.heading}>{item.content}</Text>;
            }
            if (item.type === 'question') {
                return (
                    <View key={index} style={styles.questionContainer}>
                        <Text style={styles.questionText}>{`${item.qNumber}. ${item.content}`}</Text>
                        <Text style={styles.marks}>{`(${item.marks})`}</Text>
                    </View>
                );
            }
            return null; // Handle other types if necessary
        })}
    </Page></Document>
  )
}

export default PaperLayout